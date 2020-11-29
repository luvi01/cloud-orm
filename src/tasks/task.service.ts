import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { async } from 'rxjs';
import { User } from 'src/users/user.entity';
import { Long } from 'typeorm';
import { TaskConsultDto } from './dto/TaskConsultDto';
import { TaskCreateDto } from './dto/TaskCreateDto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';



@Injectable()
export class TaskService {
    constructor(
        private taskRepository: TaskRepository,

    ) { }

    async createTask(taskCreateDto: TaskCreateDto, user: User): Promise<Task> {
        const task = await this.taskMapper(taskCreateDto, user);
        try {
            await task.save();
        } catch (error) {
            console.log(error.code)
            if (error.code === "EREQUEST") {
                throw new ConflictException("Task já cadastrada");
            } else {
                throw new InternalServerErrorException();
            }
        }
        return task;
    }

    async getAll(): Promise<TaskConsultDto[]> {
        const taskConsultDtos = new Array<TaskConsultDto>();

        try {
            const tasks = await this.taskRepository.find();
            if (!tasks || tasks.length == 0 || tasks[0] == null) {
                throw new NotFoundException("Nenhuma task encontrada.");
            }
            tasks.forEach(task => {
                taskConsultDtos.push(this.taskConsultDtoMapper(task.user, task))
            });
            return taskConsultDtos
        } finally { }
    }

    async getTasksByUser(user: User): Promise<TaskConsultDto[]> {
        const taskConsultDtos = new Array<TaskConsultDto>();
        try {
            const tasks = await this.taskRepository.find({user})
            if (!tasks || tasks.length == 0 || tasks[0] == null) {
                throw new NotFoundException("Nenhuma task encontrada.");
            }

            for (const task of tasks){
                taskConsultDtos.push(this.taskConsultDtoMapper(user, task));
            };

            return taskConsultDtos;
        } finally { }
    }

    async getTaskById(taskId: Long): Promise<TaskConsultDto> {
        try {
            const task = await this.taskRepository.findOne({ taskId });
            if (!task) {
                throw new NotFoundException("Nenhuma task encontrada.");
            }
            return this.taskConsultDtoMapper(task.user, task);

        } finally { }
    }

    async deleteTaskById(taskId: Long): Promise<void> {
        try {
            const task = await this.taskRepository.delete({taskId})
            if (!task) {
                throw new NotFoundException("Nenhuma task encontrada.");
            }
        } finally { }
    }

    private taskConsultDtoMapper(user: User, task: Task): TaskConsultDto {
        const taskConsultDto = new TaskConsultDto();
        taskConsultDto.title = task.title;
        taskConsultDto.description = task.description;
        taskConsultDto.taskId = task.taskId;
        taskConsultDto.username = user.name;
        return taskConsultDto;
    }
    
    private taskMapper(taskCreateDto: TaskCreateDto, user: User): Task {
        const task = new Task();
        task.title = taskCreateDto.title;
        task.description = taskCreateDto.description;
        task.user = user;
        return task;
    }
}
