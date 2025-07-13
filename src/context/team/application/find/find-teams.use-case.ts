import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Member } from 'src/context/auth/infrastructure/persistence';
import { UserPayload } from 'src/global/types/user';

@Injectable()
export class FindTeamsUseCase {
  async execute(req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    const teams = await Member.createQueryBuilder('member')
      .leftJoinAndSelect('member.team', 'team')
      .leftJoin('team.members', 'teamMember')
      .leftJoin('teamMember.user', 'memberUser')
      .leftJoin('memberUser.profile', 'memberUserProfile')
      .where('member.userId = :userId', { userId: userPayload.id })
      .andWhere('member.confirmed = true')
      .select([
        'member.userId',
        'member.teamId',
        'member.confirmed',
        'member.role',
        'team.id',
        'team.name',
        'teamMember.userId',
        'teamMember.role',
        'teamMember.confirmed',
        'memberUser.id',
        'memberUser.username',
        'memberUserProfile.firstname',
        'memberUserProfile.lastname',
      ])
      .getMany();

    return teams;
  }
}
