import { PartialType } from '@nestjs/swagger';
import { CreateBankAccountDto } from './bank-account.create.dto';

export class UpdateBankAccountDto extends PartialType(CreateBankAccountDto) {}
