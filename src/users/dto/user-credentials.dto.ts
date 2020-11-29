import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty } from 'class-validator';

export class UserCredentialsDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string
}