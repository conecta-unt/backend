import { Module } from 'src/bootstrap';
import {
  ChangePasswordController,
  ConfirmChangePasswordController,
  ConfirmUserAccountController,
  CreateUserAccountController,
  GoogleSocialLoginController,
  RefreshConfirmationTokenController,
  RefreshTokenController,
  RequestChangePasswordController,
  UserLoginController,
  UserLogoutController,
} from './http-api';
import {
  AuthSharedService,
  ChangePasswordUseCase,
  ConfirmChangePasswordUseCase,
  ConfirmUserAccountUseCase,
  CreateUserAccountUseCase,
  GoogleSocialLoginUseCase,
  RefreshTokenUseCase,
  RequestChangePasswordUseCase,
  UserLoginUseCase,
  UserLogoutUseCase,
  UserRefreshConfirmationTokenUseCase,
} from '../application';
import {
  MemberRepository,
  TeamRepository,
  UserConfirmationTokenRepository,
  UserLoginAttempsRepository,
  UserProfileRepository,
  UserProviderRepository,
  UserRefreshTokenRepository,
  UserRepository,
  UserRoleRepository,
} from '../domain';
import {
  InDatabaseMemberRepository,
  InDatabaseProviderRepository,
  InDatabaseRoleRepository,
  InDatabaseTeamRepository,
  InDatabaseUserConfirmationTokenRepository,
  InDatabaseUserLoginAttemptsRepository,
  InDatabaseUserProfileRepository,
  InDatabaseUserRefreshTokenRepository,
  InDatabaseUserRepository,
} from './persistence';

@Module({
  controllers: [
    // Account
    ConfirmUserAccountController,
    CreateUserAccountController,
    RefreshConfirmationTokenController,
    // Session
    UserLoginController,
    UserLogoutController,
    RefreshTokenController,
    // Password
    RequestChangePasswordController,
    ConfirmChangePasswordController,
    ChangePasswordController,
    // Social
    GoogleSocialLoginController,
  ],
  providers: [
    // Shared
    AuthSharedService,
    // Account
    ConfirmUserAccountUseCase,
    CreateUserAccountUseCase,
    UserRefreshConfirmationTokenUseCase,
    // Session
    UserLoginUseCase,
    UserLogoutUseCase,
    RefreshTokenUseCase,
    // Password
    RequestChangePasswordUseCase,
    ConfirmChangePasswordUseCase,
    ChangePasswordUseCase,
    // Social
    GoogleSocialLoginUseCase,
    // Repositories
    {
      provide: UserConfirmationTokenRepository,
      useClass: InDatabaseUserConfirmationTokenRepository,
    },
    {
      provide: UserLoginAttempsRepository,
      useClass: InDatabaseUserLoginAttemptsRepository,
    },
    {
      provide: UserProfileRepository,
      useClass: InDatabaseUserProfileRepository,
    },
    {
      provide: UserRoleRepository,
      useClass: InDatabaseRoleRepository,
    },
    {
      provide: UserProviderRepository,
      useClass: InDatabaseProviderRepository,
    },
    {
      provide: UserRefreshTokenRepository,
      useClass: InDatabaseUserRefreshTokenRepository,
    },
    {
      provide: UserRepository,
      useClass: InDatabaseUserRepository,
    },
    {
      provide: MemberRepository,
      useClass: InDatabaseMemberRepository,
    },
    {
      provide: TeamRepository,
      useClass: InDatabaseTeamRepository,
    },
    InDatabaseUserConfirmationTokenRepository,
    InDatabaseUserLoginAttemptsRepository,
    InDatabaseUserProfileRepository,
    InDatabaseRoleRepository,
    InDatabaseProviderRepository,
    InDatabaseUserRefreshTokenRepository,
    InDatabaseUserRepository,
    InDatabaseMemberRepository,
    InDatabaseTeamRepository,
  ],
  exports: [
    // Account
    CreateUserAccountUseCase,
    ConfirmUserAccountUseCase,
    UserRefreshConfirmationTokenUseCase,
    // Session
    UserLoginUseCase,
    UserLogoutUseCase,
    RefreshTokenUseCase,
    // Password
    RequestChangePasswordUseCase,
    ConfirmChangePasswordUseCase,
    ChangePasswordUseCase,
    // Social
    GoogleSocialLoginUseCase,
    // Repositories
    InDatabaseUserConfirmationTokenRepository,
    InDatabaseUserLoginAttemptsRepository,
    InDatabaseUserProfileRepository,
    InDatabaseRoleRepository,
    InDatabaseProviderRepository,
    InDatabaseUserRefreshTokenRepository,
    InDatabaseUserRepository,
    InDatabaseMemberRepository,
    InDatabaseTeamRepository,
  ],
})
export class AuthModule {}
