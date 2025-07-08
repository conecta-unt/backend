import { Module } from 'src/bootstrap';
import { AuthModule } from 'src/context/auth/infrastructure/auth.module';
import {
  FindUsernameController,
  GetUserProfileController,
  UpdateUserProfileController,
} from './http-api';
import {
  FindUsernameUseCase,
  GetUserProfileUseCase,
  UpdateUserProfileUseCase,
} from '../application';

@Module({
  imports: [AuthModule],
  controllers: [
    // Info
    FindUsernameController,
    GetUserProfileController,
    // Profile
    UpdateUserProfileController,
  ],
  providers: [
    // Info
    FindUsernameUseCase,
    GetUserProfileUseCase,
    // Profile
    UpdateUserProfileUseCase,
  ],
  exports: [
    // Info
    FindUsernameUseCase,
    GetUserProfileUseCase,
    // Profile
    UpdateUserProfileUseCase,
  ],
})
export class UserModule {}
