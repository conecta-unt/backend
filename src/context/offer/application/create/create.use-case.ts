import { Injectable } from 'src/bootstrap';
import { Request } from 'express';
import { CreateOfferDTO } from './create.dto';
import { UserPayload } from 'src/global/types/user';
import { Offer, User } from 'src/context/auth/infrastructure/persistence';

@Injectable()
export class CreateOfferUseCase {
  async execute(req: Request, data: CreateOfferDTO) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    const newOffer = Offer.create({
      type: data.type,
      description: data.description,
      supervisorRequired: data.supervisorRequired,
      teamRequired: data.team,
      user: { id: userPayload.id } as User,
    });

    await newOffer.save();

    return {
      id: newOffer.id,
      type: newOffer.type,
      description: newOffer.description,
      supervisorRequired: newOffer.supervisorRequired,
      team: newOffer.teamRequired,
      createdAt: newOffer.createdAt,
    };
  }
}
