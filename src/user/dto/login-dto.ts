import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is Required' })
  @MinLength(6)
  @IsString()
  password: string;
}
