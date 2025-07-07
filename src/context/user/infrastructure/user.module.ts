import { Module } from 'src/bootstrap';
import { AuthModule } from 'src/context/auth/infrastructure/auth.module';
import { FindUsernameController } from './http-api';
import { FindUsernameUseCase } from '../application';

@Module({
  imports: [AuthModule],
  controllers: [
    // Info
    FindUsernameController,
  ],
  providers: [
    // Info
    FindUsernameUseCase,
  ],
  exports: [
    // Info
    FindUsernameUseCase,
  ],
})
export class UserModule {}
