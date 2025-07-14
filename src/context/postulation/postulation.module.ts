import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/infrastructure/auth.module';
import {
  CreatePostulationController,
  FindAvailableTeamsController,
} from './infrastructure/http-api';
import {
  CreatePostulationUseCase,
  FindAvailableTeamsUseCase,
} from './application';

@Module({
  imports: [AuthModule],
  controllers: [
    // Find
    FindAvailableTeamsController,
    //Create
    CreatePostulationController,
  ],
  providers: [
    //Find
    FindAvailableTeamsUseCase,
    // Create
    CreatePostulationUseCase,
  ],
})
export class PostulationModule {}
