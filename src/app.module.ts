import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

import { User } from "./users/users.model";
import { Role } from "./roles/roles.model";
import { AuthModule } from './auth/auth.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.PG_HOST,
            port: Number(process.env.PG_PORT),
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DB,
            entities: [
                User,
                Role,
            ],
            synchronize: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}