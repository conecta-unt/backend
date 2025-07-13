import { Module } from '@nestjs/common';
import {
  CreateOfferController,
  FindAllOffersController,
  FindUserOffersController,
} from './controllers';
import {
  CreateOfferUseCase,
  FindAllOffersUseCase,
  FindUserOffersUseCase,
} from './application';

@Module({
  controllers: [
    //Create
    CreateOfferController,
    //Find
    FindUserOffersController,
    FindAllOffersController,
  ],
  providers: [
    //Offer
    CreateOfferUseCase,
    // Find
    FindUserOffersUseCase,
    FindAllOffersUseCase,
  ],
  exports: [
    //Offer
    CreateOfferUseCase,
    // Find
    FindUserOffersUseCase,
    FindAllOffersUseCase,
  ],
})
export class OfferModule {}
