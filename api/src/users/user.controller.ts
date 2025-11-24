import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findById(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
