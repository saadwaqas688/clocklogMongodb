import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from './user.model';
import { UserDto, UserResponseDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: UserDto): Promise<User> {
    const { username, password } = userDto;

    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      username,
      password: hashedPassword,
    });

    return user.save();
  }

  async login(userDto: UserDto): Promise<string> {
    const { username, password } = userDto;

    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new Error('Invalid username');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = this.jwtService.sign({ userId: user._id });

    return token;
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find().select('id username').exec();
    return users.map((user) => ({ id: user.id, username: user.username }));
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async changePassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
  }
}
