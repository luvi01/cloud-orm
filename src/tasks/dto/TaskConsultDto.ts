import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Long } from 'typeorm';

export class TaskConsultDto{

    @ApiProperty()
    taskId: Long;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    username: String;

}
