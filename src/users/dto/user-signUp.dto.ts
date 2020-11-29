import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';


export class UserSignUpDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string
}