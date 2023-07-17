import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.model';

export type ScreenCastDocument = ScreenCast & Document;

@Schema()
export class SingleScreenCast {
  @Prop({ type: Types.ObjectId }) // Use Types.ObjectId to automatically generate ObjectId
  singleScreenCastId: Types.ObjectId;

  @Prop()
  image: string;
}

@Schema()
export class ScreenCast {
  @Prop({ required: true })
  screenCastSlotTime: string;

  @Prop({ type: String, ref: User.name })
  userId: string;

  @Prop({ required: true }) // Set the default value as an empty array
  screenCastInGroup: SingleScreenCast[];
}

export const ScreenCastSchema = SchemaFactory.createForClass(ScreenCast);
