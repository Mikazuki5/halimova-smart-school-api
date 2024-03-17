import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDTO } from './dto/registerUser-dto';
import { BaseResponse } from './interface/BaseResponse';
import { LoginDTO } from './dto/login-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/register')
  async registerAccount(@Body() registerUser: RegisterUserDTO): Promise<
    BaseResponse<{
      access_token: string;
      expire_date: Date;
      refresh_token: string;
    }>
  > {
    return await this.userService.registerUser(registerUser);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDTO): Promise<
    BaseResponse<{
      access_token: string;
      expire_date: Date;
      refresh_token: string;
    }>
  > {
    return await this.userService.login(loginDto);
  }
}
