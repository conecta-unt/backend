import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserProfileDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  major?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  area?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  bio?: string;
}
