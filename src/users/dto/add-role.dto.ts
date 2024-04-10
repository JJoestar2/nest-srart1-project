import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({ example: 'Admin', description: 'role name' })
    readonly value: string;
    
    @ApiProperty({ description: 'user Id' })
    readonly userId: string;
}