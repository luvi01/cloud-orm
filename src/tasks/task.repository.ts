import { InternalServerErrorException } from "@nestjs/common";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { EntityRepository, Long, Repository } from "typeorm";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async deleteRatingsById(taskId: Long): Promise<void>{
        try{
            const rating = await this.findOne({taskId: taskId});
            if(!rating){
                throw new NotFoundException('Task não encontrada');
            }
            this.remove(rating);
            
        } finally{}
    }

}