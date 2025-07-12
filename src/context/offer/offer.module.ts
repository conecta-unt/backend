import { Module } from '@nestjs/common';
import { CreateOfferController, FindUserOffersController } from './controllers';
import { CreateOfferUseCase, FindUserOffersUseCase } from './application';

@Module({
  controllers: [
    //Create
    CreateOfferController,
    //Find
    FindUserOffersController,
  ],
  providers: [
    //Offer
    CreateOfferUseCase,
    // Find
    FindUserOffersUseCase,
  ],
  exports: [
    //Offer
    CreateOfferUseCase,
    // Find
    FindUserOffersUseCase,
  ],
})
export class OfferModule {}
