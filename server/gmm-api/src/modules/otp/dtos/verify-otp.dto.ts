import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class verifyOTPDTO {  
    @IsNotEmpty()
    @ApiProperty()
    otp: string;

    @IsNotEmpty()
    @ApiProperty()
    userIdentifier: string;

    @IsNotEmpty()
    @ApiProperty()
    verificationKey: string;
}