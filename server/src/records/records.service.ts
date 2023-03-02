import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './records.model';

@Injectable()
export class RecordsService {
  constructor(@InjectModel(Record) private recordRepository: typeof Record) {}
  async createRecord(dto: CreateRecordDto) {
    const record = await this.recordRepository.create(dto);
    return record;
  }
  async getAllRecords() {
    const records = await this.recordRepository.findAll();
    return records;
  }
}
