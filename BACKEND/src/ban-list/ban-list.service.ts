import { Injectable } from '@nestjs/common';
import { CreateBanListDto } from './dto/create-ban-list.dto';
import { UpdateBanListDto } from './dto/update-ban-list.dto';

@Injectable()
export class BanListService {
  create(createBanListDto: CreateBanListDto) {
    return 'This action adds a new banList';
  }

  findAll() {
    return `This action returns all banList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} banList`;
  }

  update(id: number, updateBanListDto: UpdateBanListDto) {
    return `This action updates a #${id} banList`;
  }

  remove(id: number) {
    return `This action removes a #${id} banList`;
  }
}
