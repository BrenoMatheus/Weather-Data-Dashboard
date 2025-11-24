import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { User, UserSchema } from "../users/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secret-key",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
