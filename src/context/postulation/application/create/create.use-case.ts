import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreatePostulationDTO } from './create.dto';
import { UserPayload } from 'src/global/types/user';
import { Postulation } from 'src/context/auth/infrastructure/persistence/entities';

@Injectable()
export class CreatePostulationUseCase {
  async execute(req: Request, data: CreatePostulationDTO) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    const newPostulation = data.teamId
      ? Postulation.create({
          offer: { id: data.offerId },
          team: { id: data.teamId },
        })
      : Postulation.create({
          offer: { id: data.offerId },
          user: { id: userPayload.id },
        });

    await newPostulation.save();
  }
}
