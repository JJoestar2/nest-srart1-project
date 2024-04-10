import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({ description: 'user id' })
    readonly userId: string;
    
    @ApiProperty({ description: 'ban reason decsription' })
    readonly banReason: string;
}