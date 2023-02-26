import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodolistController } from './toDoList.controller';
import { ToDoList } from './toDoList.model';
import { TodolistService } from './toDoList.service';

@Module({
  controllers: [TodolistController],
  providers: [TodolistService],
  imports: [SequelizeModule.forFeature([ToDoList])],
})
export class TodolistModule {}
