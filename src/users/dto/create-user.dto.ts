import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'mail@gmail.com', description: 'user email' })
    readonly email: string;
    
    @ApiProperty({ description: 'user password' })
    readonly password: string;
}