import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'; // Import Types from mongoose
import { UserResponseDto } from 'src/user/user.dto';
import { User, UserDocument } from '../user/user.model';

@Schema()
export class Company {
  @Prop({ required: true })
  name: string;
}

export type CompanyDocument = Company & Document;

export const CompanySchema = SchemaFactory.createForClass(Company);