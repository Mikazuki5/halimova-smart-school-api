import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user-schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDTO } from './dto/registerUser-dto';
import { BaseResponse } from './interface/BaseResponse';

import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(payload: RegisterUserDTO): Promise<
    BaseResponse<{
      access_token: string;
      expire_date: Date;
      refresh_token: string;
    }>
  > {
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      address,
      gender,
      religion,
      isHeadDepartment,
      isHeadSchool,
      department,
    } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      firstName,
      lastName,
      fullname: firstName + ' ' + lastName,
      email,
      password: hashedPassword,
      age,
      address,
      gender,
      religion,
      isHeadDepartment,
      isHeadSchool,
      department,
    });

    const access_token = this.jwtService.sign({ id: user._id });
    const expire_date = new Date(Date.now() + 3600000);
    const refresh_token = this.jwtService.sign(
      { id: user._id },
      { expiresIn: '7d' },
    );

    return {
      error: false,
      data: {
        access_token,
        expire_date,
        refresh_token,
      },
      message: 'Register Success!',
    };
  }

  async login(payload: LoginDTO): Promise<
    BaseResponse<{
      access_token: string;
      expire_date: Date;
      refresh_token: string;
    }>
  > {
    const { email, password } = payload;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const access_token = this.jwtService.sign({ id: user._id });
    const expire_date = new Date(Date.now() + 3600000);
    const refresh_token = this.jwtService.sign(
      { id: user._id },
      { expiresIn: '7d' },
    );

    return {
      error: false,
      data: {
        access_token,
        expire_date,
        refresh_token,
      },
      message: 'Login Success!',
    };
  }
}
