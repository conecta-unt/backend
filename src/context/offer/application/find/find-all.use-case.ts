import { Injectable } from '@nestjs/common';
import { Offer } from 'src/context/auth/infrastructure/persistence';

@Injectable()
export class FindAllOffersUseCase {
  async execute(limit: number | undefined) {
    const offers = await Offer.find({
      where: { isAvailable: true },
      relations: ['user', 'user.profile', 'user.role'],
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return offers.map((offer) => ({
      id: offer.id,
      type: offer.type,
      description: offer.description,
      supervisorRequired: offer.supervisorRequired,
      team: offer.teamRequired,
      createdAt: offer.createdAt,
      user: {
        id: offer.user.id,
        username: offer.user.username,
        role: offer.user.role.name,
        profile: {
          firstname: offer.user.profile.firstname,
          lastname: offer.user.profile.lastname,
        },
      },
    }));
  }
}
