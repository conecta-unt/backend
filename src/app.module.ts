import { Module } from 'src/bootstrap';
import { GlobalModule } from './global/global.module';
import { AuthModule } from './context/auth/infrastructure/auth.module';
import { UserModule } from './context/user/infrastructure/user.module';
import { TeamModule } from './context/team/infrastructure/team.module';
import { OfferModule } from './context/offer/offer.module';

@Module({
  imports: [GlobalModule, AuthModule, UserModule, TeamModule, OfferModule],
})
export class AppModule {}
