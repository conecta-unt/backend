import { Module } from 'src/bootstrap';
import { AuthModule } from 'src/context/auth/infrastructure/auth.module';
import { CreateTeamController, FilterTeamUsersController } from './http-api';
import { CreateTeamUseCase, FilterTeamUsersUseCase } from '../application';

@Module({
  imports: [AuthModule],
  controllers: [
    // Filter
    FilterTeamUsersController,
    // Create
    CreateTeamController,
  ],
  providers: [
    // Filter
    FilterTeamUsersUseCase,
    // Create
    CreateTeamUseCase,
  ],
  exports: [
    // Filter
    FilterTeamUsersUseCase,
    // Create
    CreateTeamUseCase,
  ],
})
export class TeamModule {}
