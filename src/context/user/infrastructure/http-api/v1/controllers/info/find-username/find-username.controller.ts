import { Controller, Get, Query } from 'src/bootstrap';
import { USER_API_V1_BASE_PATH } from '../../../constants';
import { FindUsernameUseCase } from 'src/context/user/application';

@Controller(`${USER_API_V1_BASE_PATH}/info/find-username`)
export class FindUsernameController {
  constructor(private readonly findUsername: FindUsernameUseCase) {}

  @Get()
  async run(@Query('q') query: string) {
    return this.findUsername.execute({
      query,
    });
  }
}
