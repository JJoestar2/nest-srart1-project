import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/roles/roles.model";
import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class User extends BaseEntity {
    @ApiProperty({ example: 1, description: 'User unique id' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'mail@gmail.com', description: 'user email' })
    @Column({
        unique: true,
        nullable: false,
    })
    email: string

    @ApiProperty({ description: 'user password' })
    @Column({
        nullable: false,
    })
    password: string

    @ApiProperty({ example: 'true', description: 'user ban status' })
    @Column({
        default: false,
    })
    banned: boolean

    @ApiProperty({ example: 'Violent speech', description: 'user ban reason description' })
    @Column({
        nullable: true,
    })
    banReason: string

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[]
};