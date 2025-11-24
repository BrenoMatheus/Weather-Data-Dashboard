import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

import { User } from "../users/user.schema";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const userExists = await this.userModel.findOne({ email: dto.email });
    if (userExists) throw new ConflictException("Email already in use");

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      ...dto,
      password: hashed,
    });

    return {
      message: "User registered",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials");

    const payload = { sub: user._id, email: user.email };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    };
  }
}
