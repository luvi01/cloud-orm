import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UserRepository } from 'src/users/users.repository';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, TaskRepository]), forwardRef(() => UsersModule)],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
