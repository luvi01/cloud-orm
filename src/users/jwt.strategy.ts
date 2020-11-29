import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "ALArm"
        });
    }

        async validate(payload: JwtPayload) {
            const email = payload.username
            const user = await this.userRepository.findOne({email});

            if(!user) {
                throw new UnauthorizedException();
            }

            return user;
        }
}