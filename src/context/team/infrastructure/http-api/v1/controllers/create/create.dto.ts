import {
  IsArray,
  IsIn,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TeamMemberDTO {
  @IsInt()
  id: number;

  @IsString()
  @IsIn(['colaborator', 'supervisor'])
  role: 'colaborator' | 'supervisor';
}

export class CreateTeamDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamMemberDTO)
  members: TeamMemberDTO[];
}
