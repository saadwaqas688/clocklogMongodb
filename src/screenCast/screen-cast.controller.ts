import { Controller, Post, Body, UseGuards, Request, Get, Put, Delete, Param, Query} from '@nestjs/common';
import { ScreenCastService } from './screen-cast.service';
import { ScreenCastDto } from './screen-cast.dto';
import { ScreenCast } from './screen-cast.model';
import { JwtAuthGuard } from '../user/jwt-auth.guard.';

@Controller('screen-casts')
export class ScreenCastController {
  constructor(private readonly screenCastService: ScreenCastService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() screenCast: ScreenCastDto, @Request() request): Promise<ScreenCastDto> {
    // Get the userId from the token (provided by the JwtAuthGuard)
    const userId = request.user.userId;

    // Associate the userId with the screenCast object
    screenCast.userId = userId;

    // Set the current time as the screenCastSlotTime
    screenCast.screenCastSlotTime = new Date().toLocaleTimeString();


    const createdScreenCast: ScreenCast = await this.screenCastService.create(screenCast);
    // Since ScreenCast and ScreenCastDto have the same properties, no need for mapping
    return createdScreenCast;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getScreenCastsByUserIdAndTime(
    @Request() request,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ): Promise<ScreenCast[]> {
    console.log(request.user);
    const userId = request.user.userId;
    const userRole = request.user.role; // Assuming the role is available in the JWT payload
  
    if (userRole === 'admin') {
      // If the user is an admin, get all screenCasts
      return this.screenCastService.findAll();
    } else {
      // If the user is not an admin (e.g., employee), get screenCasts by user ID and time range
      return this.screenCastService.findByUserIdAndTime(userId, startTime, endTime);
    }
  }
  
  @UseGuards(JwtAuthGuard) // Apply the JWT Auth Guard to the route to extract userId from token
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ScreenCast> {
    console.log("one")
    return this.screenCastService.findById(id);
  }

  @UseGuards(JwtAuthGuard) // Apply the JWT Auth Guard to the route to protect it
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateScreenCast: ScreenCastDto,@Request() request): Promise<ScreenCast> {
    // Get the userId from the token (provided by the JwtAuthGuard)
    const userId = request.user.userId;

    // Associate the userId with the updateScreenCast object
    updateScreenCast.userId = userId;

    return this.screenCastService.update(id, updateScreenCast);
  }

  @UseGuards(JwtAuthGuard) // Apply the JWT Auth Guard to the route to protect it
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ScreenCast> {
    return this.screenCastService.delete(id);
  }
  @UseGuards(JwtAuthGuard) // Apply the JWT Auth Guard to the route to extract userId from token
  @Get()
  async findAll(): Promise<ScreenCast[]> {
    return this.screenCastService.findAll();
  }
}
