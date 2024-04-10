import {
    Body,
    Controller, 
    Get,
    Post,
    UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private service: UsersService) {}

    @ApiOperation({ summary: 'Endpoint for creating a new user' })
    @ApiResponse({
        status: 200,
        type: User,
    })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.service.createUser(userDto);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        type: [User],
    })
    @Get()
    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getAllUsers() {
        return this.service.getAllUsers();
    }

    @ApiOperation({ summary: 'Attach role' })
    @ApiResponse({ status: 200 })
    @Post('/role')
    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    addRole(@Body() addRoleDto: AddRoleDto) {
        return this.service.addRole(addRoleDto);
    }

    @ApiOperation({ summary: 'Attach role' })
    @ApiResponse({ status: 200 })
    @Post('/role/remove')
    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    removeRole(@Body() addRoleDto: AddRoleDto) {
        return this.service.removeRole(addRoleDto);
    }

    @ApiOperation({ summary: 'Ban User' })
    @ApiResponse({ status: 200 })
    @Post('/ban')
    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    banUser(@Body() addRoleDto: BanUserDto) {
        return this.service.banUser(addRoleDto);
    }
}
