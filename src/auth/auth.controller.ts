import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private service: AuthService) {}

    @Post('/login')
    login(@Body() userData: CreateUserDto) {
        return this.service.login(userData);
    }

    @Post('/register')
    registration(@Body() userData: CreateUserDto) {
        return this.service.registration(userData);
    }
}
