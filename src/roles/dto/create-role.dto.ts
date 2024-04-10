import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'role value' })
    readonly value: string;
    
    @ApiProperty({ description: 'admin role' })
    readonly description: string;
}