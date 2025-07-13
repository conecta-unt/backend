import { Module } from 'src/bootstrap';
import { AuthModule } from 'src/context/auth/infrastructure/auth.module';
import {
  ConfirmInvitationController,
  CreateTeamController,
  FilterTeamUsersController,
  FindInvitationsController,
  FindTeamsController,
} from './http-api';
import {
  ConfirmInvitationUseCase,
  CreateTeamUseCase,
  FilterTeamUsersUseCase,
  FindInvitationsUseCase,
  FindTeamsUseCase,
} from '../application';

@Module({
  imports: [AuthModule],
  controllers: [
    // Filter
    FilterTeamUsersController,
    // Create
    CreateTeamController,
    // Find
    FindInvitationsController,
    FindTeamsController,
    // Update
    ConfirmInvitationController,
  ],
  providers: [
    // Filter
    FilterTeamUsersUseCase,
    // Create
    CreateTeamUseCase,
    // Find
    FindInvitationsUseCase,
    FindTeamsUseCase,
    // Update
    ConfirmInvitationUseCase,
  ],
  exports: [
    // Filter
    FilterTeamUsersUseCase,
    // Create
    CreateTeamUseCase,
    // Find
    FindInvitationsUseCase,
    FindTeamsUseCase,
    // Update
    ConfirmInvitationUseCase,
  ],
})
export class TeamModule {}
