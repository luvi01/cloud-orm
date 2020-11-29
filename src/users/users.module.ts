import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  imports: [TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret:"ALArm",
      signOptions:{
        expiresIn: 36000,
      },
    }),
    ],
  exports: [JwtStrategy, PassportModule]
})
export class UsersModule {}
