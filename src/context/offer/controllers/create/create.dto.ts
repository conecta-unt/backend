import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateOfferDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  type: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  description: string;

  @IsBoolean()
  supervisorRequired: boolean;

  @IsBoolean()
  team: boolean;
}
