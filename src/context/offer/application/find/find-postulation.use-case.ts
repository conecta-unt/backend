import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Postulation } from 'src/context/auth/infrastructure/persistence/entities';
import { UserPayload } from 'src/global/types/user';

@Injectable()
export class FindAllPostulationsOfAClientOfferUseCase {
  async execute(req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    if (
      !userPayload ||
      typeof userPayload.id !== 'number' ||
      isNaN(userPayload.id)
    ) {
      throw new UnauthorizedException('ID de usuario no válido');
    }

    const postulations = await Postulation.createQueryBuilder('postulation')
      .leftJoinAndSelect('postulation.offer', 'offer')
      .leftJoinAndSelect('postulation.user', 'user') // para postulaciones individuales
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('postulation.team', 'team') // para postulaciones grupales
      .leftJoinAndSelect('team.members', 'member') // miembros del equipo
      .leftJoinAndSelect('member.user', 'memberUser') // usuarios de los miembros
      .leftJoinAndSelect('memberUser.profile', 'memberProfile') // perfiles de los usuarios
      .where('offer.userId = :ownerId', { ownerId: userPayload.id })
      .orderBy('postulation.id', 'DESC')
      .getMany();

    return postulations.map((p) => ({
      id: p.id,
      type: p.team ? 'team' : 'solo',
      accepted: p.accepted,
      offer: {
        id: p.offer?.id,
        type: p.offer?.type,
        description: p.offer?.description,
      },
      applicant: p.user
        ? {
            id: p.user.id,
            username: p.user.username,
            firstname: p.user.profile?.firstname,
            lastname: p.user.profile?.lastname,
          }
        : null,
      team: p.team
        ? {
            id: p.team.id,
            name: p.team.name,
            members: p.team.members.map((m) => ({
              id: m.user.id,
              username: m.user.username,
              email: m.user.email,
              firstname: m.user.profile?.firstname,
              lastname: m.user.profile?.lastname,
            })),
          }
        : null,
    }));
  }
}
