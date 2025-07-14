import { Module } from '@nestjs/common';
import {
  CreateOfferController,
  FindAllOffersController,
  FindOneOfferController,
  FindUserOffersController,
} from './controllers';
import {
  CreateOfferUseCase,
  FindAllOffersUseCase,
  FindOneOfferUseCase,
  FindUserOffersUseCase,
} from './application';

@Module({
  controllers: [
    //Create
    CreateOfferController,
    //Find
    FindUserOffersController,
    FindAllOffersController,
    FindOneOfferController,
  ],
  providers: [
    //Offer
    CreateOfferUseCase,
    // Find
    FindUserOffersUseCase,
    FindAllOffersUseCase,
    FindOneOfferUseCase,
  ],
  exports: [
    //Offer
    CreateOfferUseCase,
    // Find
    FindUserOffersUseCase,
    FindAllOffersUseCase,
    FindOneOfferUseCase,
  ],
})
export class OfferModule {}
