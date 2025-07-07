import { FastifyRequest } from 'fastify';
import { Controller, Get, Req, UseGuards } from 'src/bootstrap';
import { USER_API_V1_BASE_PATH } from '../../../constants';
import { GetUserProfileUseCase } from 'src/context/user/application';
import { AuthGuard } from 'src/global/guards/auth.guard';

@Controller(`${USER_API_V1_BASE_PATH}/info/profile`)
export class GetUserProfileController {
  constructor(private readonly profile: GetUserProfileUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  run(@Req() req: FastifyRequest) {
    return this.profile.execute(req);
  }
}
