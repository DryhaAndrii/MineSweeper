import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Post()
  create(@Body() recordsDto: CreateRecordDto) {
    return this.recordsService.createRecord(recordsDto);
  }

  @Get()
  getAll() {
    return this.recordsService.getAllRecords();
  }
}
