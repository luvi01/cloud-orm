import { ApiProperty } from '@nestjs/swagger';


export class TaskCreateDto{
    @ApiProperty()
    taskId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

}
