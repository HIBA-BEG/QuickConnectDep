import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BanListService } from './ban-list.service';
import { CreateBanListDto } from './dto/create-ban-list.dto';
import { UpdateBanListDto } from './dto/update-ban-list.dto';

@Controller('ban-list')
export class BanListController {
  constructor(private readonly banListService: BanListService) {}

  @Post()
  create(@Body() createBanListDto: CreateBanListDto) {
    return this.banListService.create(createBanListDto);
  }

  @Get()
  findAll() {
    return this.banListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.banListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBanListDto: UpdateBanListDto) {
    return this.banListService.update(+id, updateBanListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.banListService.remove(+id);
  }
}
