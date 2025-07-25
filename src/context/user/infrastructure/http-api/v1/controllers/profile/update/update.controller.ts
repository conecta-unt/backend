import { Body, Controller, Patch, Req, UseGuards } from 'src/bootstrap';
import { UpdateUserProfileDTO } from './update.dto';
import { USER_API_V1_BASE_PATH } from '../../../constants';
import { UpdateUserProfileUseCase } from 'src/context/user/application';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { Request } from 'express';

@Controller(`${USER_API_V1_BASE_PATH}/profile`)
export class UpdateUserProfileController {
  constructor(private readonly userprofile: UpdateUserProfileUseCase) {}

  @Patch()
  @UseGuards(AuthGuard)
  run(@Req() req: Request, @Body() data: UpdateUserProfileDTO) {
    return this.userprofile.execute(req, data);
  }
}
