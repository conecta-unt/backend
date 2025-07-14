import { IsInt, IsOptional } from 'class-validator';

export class CreatePostulationDTO {
  @IsOptional()
  @IsInt()
  teamId?: number;

  @IsInt()
  offerId: number;
}
