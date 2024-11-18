import { Module } from '@nestjs/common';
import { BanListService } from './ban-list.service';
import { BanListController } from './ban-list.controller';

@Module({
  controllers: [BanListController],
  providers: [BanListService],
})
export class BanListModule {}
