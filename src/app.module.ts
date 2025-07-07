import { Module } from 'src/bootstrap';
import { GlobalModule } from './global/global.module';
import { AuthModule } from './context/auth/infrastructure/auth.module';
import { UserModule } from './context/user/infrastructure/user.module';

@Module({
  imports: [GlobalModule, AuthModule, UserModule],
})
export class AppModule {}
