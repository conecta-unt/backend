export class UserLoginDTO {
  metadata: {
    redirectURL: string;
  };
  username?: string;
  email?: string;
  password: string;
}
