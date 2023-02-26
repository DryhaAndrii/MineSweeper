import { Controller, Post, Body, Get } from '@nestjs/common';
import { TodolistService } from './toDoList.service';
import { CreateListDto } from './dto/createList.dto';

@Controller('todolist')
export class TodolistController {
  constructor(private toDoListService: TodolistService) {}

  @Post()
  create(@Body() listTdo: CreateListDto) {
    return this.toDoListService.createTask(listTdo);
  }

  @Get()
  getAll() {
    return this.toDoListService.getAllTasks();
  }
}
