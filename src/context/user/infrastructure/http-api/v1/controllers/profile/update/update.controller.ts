import { FastifyRequest } from 'fastify';
import { Controller, Put, Req, UseGuards } from 'src/bootstrap';
import { UpdateUserProfileDTO } from './update.dto';
import { USER_API_V1_BASE_PATH } from '../../../constants';
import { UpdateUserProfileUseCase } from 'src/context/user/application';
import { AuthGuard } from 'src/global/guards/auth.guard';

@Controller(`${USER_API_V1_BASE_PATH}/profile`)
export class UpdateUserProfileController {
  constructor(private readonly userprofile: UpdateUserProfileUseCase) {}

  @Put()
  @UseGuards(AuthGuard)
  run(@Req() req: FastifyRequest, data: UpdateUserProfileDTO) {
    return this.userprofile.execute(req, data);
  }
}
