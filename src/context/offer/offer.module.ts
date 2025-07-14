import { Module } from '@nestjs/common';
import {
  CreateOfferController,
  FindAllOffersController,
  FindAllPostulationsOfAClientOfferController,
  FindOneOfferController,
  FindUserOffersController,
} from './controllers';
import {
  CreateOfferUseCase,
  FindAllOffersUseCase,
  FindAllPostulationsOfAClientOfferUseCase,
  FindOneOfferUseCase,
  FindUserOffersUseCase,
} from './application';

@Module({
  controllers: [
    //Create
    CreateOfferController,
    //Find
    FindAllPostulationsOfAClientOfferController,
    FindUserOffersController,
    FindAllOffersController,
    FindOneOfferController,
  ],
  providers: [
    //Offer
    CreateOfferUseCase,
    // Find
    FindAllPostulationsOfAClientOfferUseCase,
    FindUserOffersUseCase,
    FindAllOffersUseCase,
    FindOneOfferUseCase,
  ],
  exports: [
    //Offer
    CreateOfferUseCase,
    // Find
    FindAllPostulationsOfAClientOfferUseCase,
    FindUserOffersUseCase,
    FindAllOffersUseCase,
    FindOneOfferUseCase,
  ],
})
export class OfferModule {}
