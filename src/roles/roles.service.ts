import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(Role)
        private repository: Repository<Role>
    ) {}

    async createRole(dto: CreateRoleDto): Promise<Role> {
        const newRole = this.repository.create(dto);
        await this.repository.save(newRole);

        return newRole;
    }

    async getRoleByValue(value: string): Promise<Role> {
        const role = await this.repository.findOne({
            where: { value: value }
        });

        return role;
    }
}
