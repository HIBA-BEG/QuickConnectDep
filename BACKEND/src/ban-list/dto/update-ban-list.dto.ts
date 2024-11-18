import { PartialType } from '@nestjs/mapped-types';
import { CreateBanListDto } from './create-ban-list.dto';

export class UpdateBanListDto extends PartialType(CreateBanListDto) {}
