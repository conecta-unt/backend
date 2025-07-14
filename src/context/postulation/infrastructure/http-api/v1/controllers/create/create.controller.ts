import { Request } from 'express';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { POSTULATION_API_V1_BASE_PATH } from '../../constants';
import { CreatePostulationDTO } from './create.dto';
import { CreatePostulationUseCase } from 'src/context/postulation/application';

@Controller(`${POSTULATION_API_V1_BASE_PATH}/create`)
export class CreatePostulationController {
  constructor(private readonly create: CreatePostulationUseCase) {}

  @Post()
  @UseGuards(AuthGuard)
  run(@Req() req: Request, @Body() data: CreatePostulationDTO) {
    return this.create.execute(req, data);
  }
}
