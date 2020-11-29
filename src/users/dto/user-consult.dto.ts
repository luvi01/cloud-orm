import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import { Long } from "typeorm";


export class UserConsultDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: Long

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: String

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: String

}