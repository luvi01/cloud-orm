import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Long, Repository } from "typeorm";
import { UserSignUpDto } from "./dto/user-signUp.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { UserCredentialsDto } from "./dto/user-credentials.dto";
import { UserConsultDto } from "./dto/user-consult.dto";



@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(userSignUpDto: UserSignUpDto): Promise<User> {
        const newUser = await this.userMapper(userSignUpDto);
        try {
            await newUser.save();
        } catch (error) {
            console.log(error.code)
            if (error.code === "EREQUEST") {
                throw new ConflictException("Email já cadastrado");
            } else {
                throw new InternalServerErrorException();
            }
        }
        return newUser;
    }
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(userCredentialsDto: UserCredentialsDto): Promise<string> {
        const password = userCredentialsDto.password;
        const email = userCredentialsDto.email;
        const user = await this.findOne({ email });
        const pass = await user.validatePassword(password)

        if (user && pass) {
            return email;
        } else {
            null;
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.find();
            if (!users || users.length == 0 || users[0] == null) {
                throw new NotFoundException("Nenhum perfil encontrado.");
            }
            return users
        } finally { }
    }

    async deleteUsersById(userId: Long): Promise<void> {
        try {
            const user = await this.findOne({ userId });
            if (!user) {
                throw new NotFoundException('Usuário não encontrado');
            }
            this.remove(user);

        } finally { }
    }

    private async userMapper(userSignUpDto: UserSignUpDto): Promise<User> {
        const newUser = new User();
        newUser.name = userSignUpDto.name;
        newUser.email = userSignUpDto.email;
        //hash password
        const salt = await bcrypt.genSalt();
        const passwordHash = await this.hashPassword(userSignUpDto.password, salt);
        newUser.salt = salt;
        newUser.passwordHash = passwordHash;

        return newUser
    }

}