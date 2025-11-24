import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async findAll() {
    return this.userModel.find().select("-password");
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).select("-password");
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async delete(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException("User not found");
    return { message: "User deleted" };
  }
}
