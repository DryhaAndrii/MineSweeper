import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { Record } from './records/records.model';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: process.env.DB_URL, // используем строку подключения из .env
      dialectOptions: {
        ssl:
          process.env.NODE_ENV === 'production'
            ? { require: true, rejectUnauthorized: false }
            : false, // если в проде используем SSL
      },
      models: [Record],
      autoLoadModels: true,
    }),
    RecordsModule,
  ],
})
export class AppModule {}
