import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/infrastructure/auth.module';
import {
  CreatePostulationController,
  FindAvailableTeamsController,
  FindPostulationController,
} from './infrastructure/http-api';
import {
  CreatePostulationUseCase,
  FindAvailableTeamsUseCase,
  FindPostulationUseCase,
} from './application';

@Module({
  imports: [AuthModule],
  controllers: [
    // Find
    FindPostulationController,
    FindAvailableTeamsController,
    //Create
    CreatePostulationController,
  ],
  providers: [
    //Find
    FindPostulationUseCase,
    FindAvailableTeamsUseCase,
    // Create
    CreatePostulationUseCase,
  ],
})
export class PostulationModule {}
