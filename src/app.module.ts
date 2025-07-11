import { Module } from 'src/bootstrap';
import { GlobalModule } from './global/global.module';
import { AuthModule } from './context/auth/infrastructure/auth.module';
import { UserModule } from './context/user/infrastructure/user.module';
import { TeamModule } from './context/team/infrastructure/team.module';

@Module({
  imports: [GlobalModule, AuthModule, UserModule, TeamModule],
})
export class AppModule {}
