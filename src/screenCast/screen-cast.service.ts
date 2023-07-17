import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ScreenCastDto, SingleScreenCastDto } from './screen-cast.dto';
import { ScreenCast } from './screen-cast.model';
import { User, UserDocument } from '../user/user.model';


@Injectable()
export class ScreenCastService {
  constructor(
    @InjectModel(ScreenCast.name) private readonly screenCastModel: Model<ScreenCast>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(screenCast: ScreenCastDto): Promise<ScreenCast> {
    const screenCastInGroupWithIds: SingleScreenCastDto[] = screenCast.screenCastInGroup.map(
      (singleScreenCast) => ({
        ...singleScreenCast,
        singleScreenCastId: new Types.ObjectId(),
      })
    );

    const createdScreenCast = new this.screenCastModel({
      ...screenCast,
      screenCastInGroup: screenCastInGroupWithIds,
    });

    return createdScreenCast.save();
  }

  async findAll(): Promise<ScreenCast[]> {
    return this.screenCastModel.find().populate('userId').exec();
  }

  async findById(screenCastGroupId: string): Promise<ScreenCast> {
    return this.screenCastModel.findOne({ screenCastGroupId }).populate('userId').exec();
  }

  async update(screenCastGroupId: string, updateScreenCast: ScreenCastDto): Promise<ScreenCast> {
    return this.screenCastModel.findOneAndUpdate({ screenCastGroupId }, updateScreenCast, {
      new: true,
    });
  }

  async delete(screenCastGroupId: string): Promise<ScreenCast> {
    return this.screenCastModel.findOneAndRemove({ screenCastGroupId });
  }

  async findByUserId(userId: string): Promise<ScreenCast[]> {
    const screenCasts = await this.screenCastModel.find({ userId }).exec();
    return screenCasts;
  }
  async findByUserIdAndTime(userId: string, startTime: string, endTime: string): Promise<ScreenCast[]> {
    // Fetch screen casts associated with the user ID and matching time
    const screenCasts = await this.screenCastModel.find({
      userId,
      screenCastSlotTime: { $gte: startTime, $lt: endTime },
    }).exec();

    return screenCasts;
  }
}
