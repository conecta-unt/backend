import { Request } from 'express';
import { Injectable } from 'src/bootstrap';
import { CreateTeamDTO } from './create.dto';
import { UserPayload } from 'src/global/types/user';
import {
  InDatabaseMemberRepository,
  InDatabaseTeamRepository,
} from 'src/context/auth/infrastructure/persistence';

@Injectable()
export class CreateTeamUseCase {
  constructor(
    private readonly member: InDatabaseMemberRepository,
    private readonly team: InDatabaseTeamRepository,
  ) {}

  async execute(req: Request, data: CreateTeamDTO) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    const newTeam = await this.team.create(data.name);

    const members: {
      id: number;
      role: 'colaborator' | 'supervisor' | 'owner';
    }[] = [{ id: userPayload.id, role: 'owner' }, ...data.members];

    await this.member.createMany(newTeam.id, members);
  }
}
