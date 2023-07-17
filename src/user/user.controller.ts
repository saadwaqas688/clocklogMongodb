import { Controller, Post, Body, Get, Param, UseGuards, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from './jwt-auth.guard.';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: UserDto): Promise<any> {
    try {
      const user = await this.userService.register(userDto);
      return {
        message: 'User registered successfully',
        user,
      };
    } catch (error) {
      return {
        message: 'Error registering user',
        error: error.message,
      };
    }
  }

  @Post('login')
  async login(@Body() userDto: UserDto): Promise<any> {
    try {
      const token = await this.userService.login(userDto);
      return {
        message: 'Login successful',
        token,
      };
    } catch (error) {
      return {
        message: 'Error logging in',
        error: error.message,
      };
    }
  }
  @Get()
  async getAllUsers(): Promise<any> {
    try {
      const users = await this.userService.getAllUsers();
      return {
        message: 'Users retrieved successfully',
        users,
      };
    } catch (error) {
      return {
        message: 'Error retrieving users',
        error: error.message,
      };
    }
  }
  @UseGuards(JwtAuthGuard) // Apply the JWT Auth Guard to the route
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<any> {
    try {
      const user = await this.userService.getUserById(id);
      return {
        message: 'User retrieved successfully',
        user,
      };
    } catch (error) {
      return {
        message: 'Error retrieving user',
        error: error.message,
      };
    }
  }

  @Put(':id/change-password')
  async changePassword(@Param('id') id: string, @Body() passwordDto: { newPassword: string }): Promise<any> {
    try {
      await this.userService.changePassword(id, passwordDto.newPassword);
      return {
        message: 'Password changed successfully',
      };
    } catch (error) {
      return {
        message: 'Error changing password',
        error: error.message,
      };
    }
  }
}
