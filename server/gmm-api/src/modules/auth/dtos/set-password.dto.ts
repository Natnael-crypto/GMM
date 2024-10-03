import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SetPasswordDto {
    @IsNotEmpty()
    @ApiProperty()
    token: string; 
    
    @IsNotEmpty()
    @ApiProperty()
    newPassword: string; 
  }
  