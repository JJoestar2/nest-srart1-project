import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    private async validate(userData: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userData.email);
        const isPasswordEqual = await bcrypt.compare(userData.password, user.password);

        if(user && isPasswordEqual) return user;

        throw new UnauthorizedException({message: 'Invalid email or password'});

    }

    private async generateToken(user: User) {
        const { email, id, roles } = user;
        
        return { token: this.jwtService.sign({ email, id, roles }) };
    }

    async login(userData: CreateUserDto) {
        const user = await this.validate(userData);
        return this.generateToken(user);
    }

    async registration(userData: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userData.email);
        if (candidate) throw new HttpException('User with this mail is already exists!', HttpStatus.BAD_REQUEST);
        
        const passwordHash = await bcrypt.hash(userData.password, 5);
        const user = await this.usersService.createUser({...userData, password: passwordHash});

        return this.generateToken(user);
    }
}
