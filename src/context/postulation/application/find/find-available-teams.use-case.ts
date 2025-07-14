import { Request } from 'express';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserPayload } from 'src/global/types/user';
import {
  Member,
  Offer,
  Team,
} from 'src/context/auth/infrastructure/persistence';

@Injectable()
export class FindAvailableTeamsUseCase {
  async execute(req: Request, offerId: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    const offer = await Offer.findOne({
      where: { id: offerId },
    });

    if (!offer) throw new NotFoundException();

    if (!offer.teamRequired) return [];

    const teams = await Team.createQueryBuilder('team')
      // Asegurar que el usuario participe en el equipo
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('m.teamId')
          .from(Member, 'm')
          .where('m.userId = :userId', { userId: userPayload.id })
          .getQuery();
        return `team.id IN ${subQuery}`;
      })
      // Excluir equipos con miembros sin confirmar
      .andWhere(
        `NOT EXISTS (
      SELECT 1 FROM team_member m2
      WHERE m2.teamId = team.id AND m2.confirmed IS NULL
    )`,
      )
      // Si requiere supervisor, validarlo
      .andWhere(() => {
        if (offer.supervisorRequired) {
          return `EXISTS (
          SELECT 1 FROM team_member tm
          INNER JOIN \`user\` u ON u.id = tm.userId
          INNER JOIN role r ON r.id = u.role_id
          WHERE tm.teamId = team.id
            AND tm.confirmed = true
            AND tm.role = 'supervisor'
        )`;
        }
        return '1=1';
      })
      // Join al miembro con rol 'owner'
      .leftJoin(
        'team.members',
        'ownerMember',
        'ownerMember.role = :ownerRole',
        {
          ownerRole: 'owner',
        },
      )
      .leftJoin('ownerMember.user', 'ownerUser')
      .select(['team.id', 'team.name', 'ownerUser.username'])
      .getRawMany();

    return teams.map((t) => ({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      id: t.team_id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      name: t.team_name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      ownerUsername: t.ownerUser_username,
    }));
  }
}
