import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from '../company/company.model'; // Import the Company model and CompanyDocument
import { Project } from 'src/project/project.model';

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Company.name })
  company: string; // Use Company type or string type for the ObjectId

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  projects: mongoose.Schema.Types.ObjectId[] | Project[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
