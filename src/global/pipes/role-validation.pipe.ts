import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { RoleE } from '../types/enums/role.enum';

@Injectable()
export class RoleValidationPipe implements PipeTransform {
  private readonly allowedRoles = Object.values(RoleE);

  transform(value: RoleE) {
    if (!this.allowedRoles.includes(value)) {
      throw new BadRequestException(`Invalid role: ${value}`);
    }
    return value;
  }
}
