import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Long } from 'typeorm';
import { UserConsultDto } from './dto/user-consult.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserSignUpDto } from './dto/user-signUp.dto';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async signUp(userSignUpDto: UserSignUpDto) {
        const newUser = await this.userRepository.signUp(userSignUpDto);
        return this.userConsultDtoMapper(newUser);

    }

    async signIn(userCredentialsDto: UserCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(userCredentialsDto);

        if (!username) {
            throw new UnauthorizedException("Credenciais Invalidas");
        }
        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }


    async getAllUsers(): Promise<UserConsultDto[]> {
        const usersDto = new Array<UserConsultDto>();
        const users = await this.userRepository.getAllUsers();
        users.forEach(user => {
            usersDto.push(this.userConsultDtoMapper(user))
        });
        return usersDto
    }

    async getUserLogged(user: User): Promise<UserConsultDto> {
        const email = user.email
        try {
            const loggedUser = await this.userRepository.findOne({ email });
            if (!loggedUser) {
                throw new NotFoundException("Nenhum usuário encontrado.");
            }
            return this.userConsultDtoMapper(loggedUser);
        } finally { }

    }

    async deleteUserById(user: User, userId: Long): Promise<void> {
        await this.userRepository.deleteUsersById(userId);
    }

    private userConsultDtoMapper(user: User): UserConsultDto {
        const userConsultDto = new UserConsultDto;
        userConsultDto.userId = user.userId;
        userConsultDto.name = user.name;
        userConsultDto.email = user.email;
        return userConsultDto
    }
}
