import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.entity';
import { Long } from 'typeorm';
import { TaskConsultDto } from './dto/TaskConsultDto';
import { TaskCreateDto } from './dto/TaskCreateDto';
import { TaskService } from './task.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';




@ApiTags('Task')
@Controller('task')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard())
export class TaskController {
    constructor(
        private taskService: TaskService, 
    ) {}

    @Get("/")
    getTasks(): Promise<TaskConsultDto[]> {
        return this.taskService.getAll();
    }

    @Get('/user')
    getTasksByUser(@GetUser() user: User): Promise<TaskConsultDto[]> {
        return this.taskService.getTasksByUser(user);
    }

    @Get('/:taskId')
    getTaskById(@Param('taskId') taskId: Long): Promise<TaskConsultDto> {
        return this.taskService.getTaskById(taskId);
    }

    @Delete('/:taskId')
    deleteTaskById(@Param('taskId') taskId: Long): Promise<void> {
        return this.taskService.deleteTaskById(taskId);
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    taskCreate(@GetUser() user: User, @Body() taskCreateDto: TaskCreateDto) {
        console.log(taskCreateDto);
        this.taskService.createTask(taskCreateDto, user);
    }

}
