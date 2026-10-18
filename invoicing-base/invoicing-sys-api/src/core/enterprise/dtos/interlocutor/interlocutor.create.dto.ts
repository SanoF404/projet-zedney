import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { SocialTitles } from 'src/app/enums/social-titles.enum';

export class CreateInterlocutorDto {
  @ApiProperty({ type: String, enum: SocialTitles })
  @IsString()
  title: SocialTitles;

  @ApiProperty({ type: String })
  @IsString()
  firstName: string;

  @ApiProperty({ type: String })
  @IsString()
  lastName: string;

  @ApiProperty({ type: String })
  @IsString()
  phone: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsEmail()
  email: string;
}
