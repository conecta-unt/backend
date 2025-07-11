import { Injectable } from 'src/bootstrap';
import { TeamRepository } from 'src/context/auth/domain';
import { Team } from '../entities/team.entity';

@Injectable()
export class InDatabaseTeamRepository implements TeamRepository {
  async create(name: string) {
    const newTeam = Team.create({ name });

    await newTeam.save();

    return {
      id: newTeam.id,
      name: newTeam.name,
    };
  }
}
