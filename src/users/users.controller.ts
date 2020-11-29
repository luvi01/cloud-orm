import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Long } from 'typeorm';
import { UserConsultDto } from './dto/user-consult.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserSignUpDto } from './dto/user-signUp.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { UsersService } from './users.service';


@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) userSignUpDto: UserSignUpDto) {
        console.log(userSignUpDto);
        this.usersService.signUp(userSignUpDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) userCredentialsDto: UserCredentialsDto): Promise<{ accessToken: string }> {
        console.log(userCredentialsDto);
        return this.usersService.signIn(userCredentialsDto);
    }

    @ApiBearerAuth('access-token')
    @Get()
    @UseGuards(AuthGuard())
    getUsers(): Promise<UserConsultDto[]> {
        return this.usersService.getAllUsers();
    }

    @ApiBearerAuth('access-token')
    @Get('/logged')
    @UseGuards(AuthGuard())
    getUserLogged(@GetUser() user: User): Promise<UserConsultDto> {
        return this.usersService.getUserLogged(user);
    }

    @ApiBearerAuth('access-token')
    @Delete('/:userId')
    @UseGuards(AuthGuard())
    deleteUserById(@GetUser() user: User, @Param('userId') userId: Long): Promise<void> {
        return this.usersService.deleteUserById(user, userId);
    }

}
