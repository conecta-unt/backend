import { Request } from 'express';
import { Injectable } from 'src/bootstrap';
import { Offer } from 'src/context/auth/infrastructure/persistence';
import { UserPayload } from 'src/global/types/user';

@Injectable()
export class FindUserOffersUseCase {
  async execute(req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPayload = (req as any).userPayload as UserPayload;

    const offers = await Offer.find({
      where: {
        user: { id: userPayload.id },
      },
      relations: ['user'],
    });

    return offers.map((offer) => ({
      id: offer.id,
      type: offer.type,
      description: offer.description,
      supervisorRequired: offer.supervisorRequired,
      team: offer.teamRequired,
      createdAt: offer.createdAt,
    }));
  }
}
