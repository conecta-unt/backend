import { Module } from 'src/bootstrap';
import { AuthModule } from 'src/context/auth/infrastructure/auth.module';
import { FindUsernameController, GetUserProfileController } from './http-api';
import { FindUsernameUseCase, GetUserProfileUseCase } from '../application';

@Module({
  imports: [AuthModule],
  controllers: [
    // Info
    FindUsernameController,
    GetUserProfileController,
  ],
  providers: [
    // Info
    FindUsernameUseCase,
    GetUserProfileUseCase,
  ],
  exports: [
    // Info
    FindUsernameUseCase,
    GetUserProfileUseCase,
  ],
})
export class UserModule {}
