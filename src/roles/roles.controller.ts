import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private service: RolesService) {}

    @Post()
    create(@Body() roleDto: CreateRoleDto) {
        return this.service.createRole(roleDto);
    }

    @Get('/:value')
    getRoleByValue(@Param('value') value: string) {
        return this.service.getRoleByValue(value);
    }
}
