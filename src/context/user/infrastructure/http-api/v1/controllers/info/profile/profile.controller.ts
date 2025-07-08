import { Controller, Get, Query, Req, UseGuards } from 'src/bootstrap';
import { USER_API_V1_BASE_PATH } from '../../../constants';
import { GetUserProfileUseCase } from 'src/context/user/application';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { Request } from 'express';

@Controller(`${USER_API_V1_BASE_PATH}/info/profile`)
export class GetUserProfileController {
  constructor(private readonly profile: GetUserProfileUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  run(@Req() req: Request, @Query('q') q: string | undefined) {
    return this.profile.execute(req, q);
  }
}
