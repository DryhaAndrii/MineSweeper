import { Injectable } from '@nestjs/common';
import { ToDoList } from './toDoList.model';
import { CreateListDto } from './dto/createList.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TodolistService {
  constructor(@InjectModel(ToDoList) private toDoListModel: typeof ToDoList) {}
  async createTask(dto: CreateListDto) {
    const task = await this.toDoListModel.create(dto);
    return task;
  }
  async getAllTasks() {
    const tasks = await this.toDoListModel.findAll();
    return tasks;
  }
}
