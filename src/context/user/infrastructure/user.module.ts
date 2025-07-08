import { Module } from 'src/bootstrap';
import { AuthModule } from 'src/context/auth/infrastructure/auth.module';
import {
  FindUsernameController,
  GetUserProfileController,
  UpdateUserProfileController,
  UploadProfileImageController,
} from './http-api';
import {
  FindUsernameUseCase,
  GetUserProfileUseCase,
  UpdateUserProfileUseCase,
  UploadProfileImageUseCase,
} from '../application';

@Module({
  imports: [AuthModule],
  controllers: [
    // Info
    FindUsernameController,
    GetUserProfileController,
    // Profile
    UpdateUserProfileController,
    UploadProfileImageController,
  ],
  providers: [
    // Info
    FindUsernameUseCase,
    GetUserProfileUseCase,
    // Profile
    UpdateUserProfileUseCase,
    UploadProfileImageUseCase,
  ],
  exports: [
    // Info
    FindUsernameUseCase,
    GetUserProfileUseCase,
    // Profile
    UpdateUserProfileUseCase,
    UploadProfileImageUseCase,
  ],
})
export class UserModule {}
