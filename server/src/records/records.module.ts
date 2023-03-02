import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecordsController } from './records.controller';
import { Record } from './records.model';
import { RecordsService } from './records.service';

@Module({
  controllers: [RecordsController],
  providers: [RecordsService],
  imports: [SequelizeModule.forFeature([Record])],
})
export class RecordsModule {}
