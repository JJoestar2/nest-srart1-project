import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private repostitory: Repository<User>,
        private roleService: RolesService,
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const role = await this.roleService.getRoleByValue('User'); // todo create enum for roles
        const user = this.repostitory.create({ ...dto, roles: [role] });

        await this.repostitory.save(user);
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.repostitory.find({ relations: ['roles'] });
        return users;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.repostitory.findOne({ where: { email: email }, relations: ['roles'] });
        return user;
    }

    async addRole(data: AddRoleDto) {
        const user = await this.repostitory.findOne({ where: { id: Number(data.userId) }, relations: ['roles'] });
        const role = await this.roleService.getRoleByValue(data.value);

        if (user && role) {
            const checkIfRoleExists = user.roles.find(role => role.value === data.value);

            if(!checkIfRoleExists) {
                user.roles.push(role);

                await this.repostitory.save(user);
    
                return data;
            }

            throw new HttpException('Role is already exists!', HttpStatus.BAD_REQUEST);
        }

        throw new HttpException('User or role not found!', HttpStatus.NOT_FOUND);
    }

    async removeRole(data: AddRoleDto) {
        const user = await this.repostitory.findOne({ where: { id: Number(data.userId) }, relations: ['roles'] });

        if (user) {
            const userRoleForRemove = user.roles.find(role => role.value === data.value);

            if (userRoleForRemove) {
                const updatedRoles = user.roles.filter(role => role.value !== data.value);
                user.roles = updatedRoles;

                await this.repostitory.save(user);
                
                return data;
            }

            throw new HttpException('Role not found!', HttpStatus.NOT_FOUND);
        }

        throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    async banUser(data: BanUserDto) {
        const user = await this.repostitory.findOne({ where: { id: Number(data.userId) } });

        if (user) {
            const updatedUser = { ...user, banned: true, banReason: data.banReason };
            await this.repostitory.save(updatedUser);

            return updatedUser;
        }

        throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
}
