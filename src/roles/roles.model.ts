import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";
import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Role extends BaseEntity {
    @ApiProperty({ example: 1, description: 'Role unique id' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'ADMIN', description: 'Role name' })
    @Column({
        unique: true,
        nullable: false,
    })
    value: string

    @ApiProperty({ description: 'Role description' })
    @Column({
        nullable: true,
    })
    description: string

    @ManyToMany(() => User, (user) => user.roles)
    users: User[]
};