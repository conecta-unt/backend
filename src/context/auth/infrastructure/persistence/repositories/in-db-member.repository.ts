import { Injectable } from 'src/bootstrap';
import { MemberRepository } from 'src/context/auth/domain';
import { Member } from '../entities/member.entity';
import { Team } from '../entities/team.entity';
import { User } from '../entities';
import { DeepPartial } from 'typeorm';

@Injectable()
export class InDatabaseMemberRepository implements MemberRepository {
  async createMany(teamId: number, members: { id: number; role: string }[]) {
    const _members: DeepPartial<Member>[] = members.map((member) => ({
      team: { id: teamId } as Team,
      user: { id: member.id } as User,
      role: member.role,
    }));

    const memberTeam = Member.create(_members);
    await Member.save(memberTeam);
  }
}
