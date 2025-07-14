import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Member } from 'src/context/auth/infrastructure/persistence';
import { Postulation } from 'src/context/auth/infrastructure/persistence/entities';
import { UserPayload } from 'src/global/types/user';

@Injectable()
export class FindPostulationUseCase {
  async execute(req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    const teams = await Member.find({
      where: { userId: userPayload.id },
      select: ['teamId'],
    });

    const teamIds = teams.map((m) => m.teamId);

    const postulations = await Postulation.createQueryBuilder('postulation')
      .leftJoinAndSelect('postulation.offer', 'offer')
      .leftJoinAndSelect('postulation.team', 'team')
      .leftJoinAndSelect('postulation.user', 'user')
      .where('postulation.userId = :userId', { userId: userPayload.id })
      .orWhere(
        teamIds.length > 0 ? 'postulation.teamId IN (:...teamIds)' : 'FALSE',
        { teamIds },
      ) // equipo
      .orderBy('postulation.id', 'DESC')
      .getMany();

    return postulations.map((p) => ({
      id: p.id,
      type: p.team ? 'team' : 'solo',
      offer: {
        id: p.offer?.id,
        type: p.offer?.type,
        description: p.offer?.description,
      },
      team: p.team ? { id: p.team.id, name: p.team.name } : null,
      accepted: p.accepted,
    }));
  }
}
