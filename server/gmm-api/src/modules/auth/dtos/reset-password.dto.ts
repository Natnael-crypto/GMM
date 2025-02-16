import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from '@shared/decorators/password.decorator';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsStrongPassword()
  newPassword: string;
}
