import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { Offer } from 'src/context/auth/infrastructure/persistence';
import {
  Member,
  Postulation,
} from 'src/context/auth/infrastructure/persistence/entities';
import { UserPayload } from 'src/global/types/user';

@Injectable()
export class FindOneOfferUseCase {
  async execute(req: Request, id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    const offer = await Offer.findOne({
      where: { id, isAvailable: true },
      relations: ['user', 'user.profile', 'user.role', 'postulation'],
    });

    if (!offer) throw new NotFoundException();

    // 1. Verificar si el usuario ha postulado individualmente
    const soloPostulation = await Postulation.findOne({
      where: {
        offer: { id },
        user: { id: userPayload.id },
      },
    });

    // 2. Obtener equipos del usuario actual
    const teams = await Member.createQueryBuilder('member')
      .select('member.teamId')
      .where('member.userId = :userId', { userId: userPayload.id })
      .getMany();

    const teamIds = teams.map((m) => m.teamId);

    // 3. Verificar si alguno de los equipos ha postulado a esta oferta
    let teamPostulation: Postulation | undefined = undefined;

    if (teamIds.length > 0) {
      teamPostulation =
        (await Postulation.createQueryBuilder('postulation')
          .where('postulation.offerId = :offerId', { offerId: id })
          .andWhere('postulation.teamId IN (:...teamIds)', { teamIds })
          .getOne()) || undefined;
    }

    return {
      id: offer.id,
      type: offer.type,
      description: offer.description,
      supervisorRequired: offer.supervisorRequired,
      team: offer.teamRequired,
      createdAt: offer.createdAt,
      user: {
        id: offer.user.id,
        username: offer.user.username,
        role: offer.user.role.name,
        profile: {
          firstname: offer.user.profile.firstname,
          lastname: offer.user.profile.lastname,
        },
      },
      postulationStatus: soloPostulation
        ? 'solo'
        : teamPostulation
          ? 'team'
          : null,
    };
  }
}
