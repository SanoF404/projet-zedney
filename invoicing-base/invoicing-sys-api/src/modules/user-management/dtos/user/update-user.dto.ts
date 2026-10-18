import { ApiProperty } from '@nestjs/swagger';
import { UpdateAbstractUserDto } from 'src/shared/abstract-user-management/dtos/abstract-user/update-abstract-user.dto';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Gender } from 'src/shared/abstract-user-management/enums/gender.enum';

export class UpdateUserDto extends UpdateAbstractUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @Length(8, 20)
  @IsOptional()
  phone?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ type: String, enum: Gender, example: Gender.Male })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  pictureId?: number;
}
