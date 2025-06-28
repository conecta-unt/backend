import { RoleE } from 'src/global/types/enums/role.enum';

export class GoogleSocialLoginDTO {
  metadata: {
    redirectUrl: string;
    redirectErrorUrl: string;
  };
  code: string;
  role: RoleE;
}
