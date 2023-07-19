import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose'; // Import Types from mongoose
import { Company } from 'src/company/company.model';
import { User } from 'src/user/user.model';

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Company.name })
  company: string; // Use Company type or string type for the ObjectId
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  projects: mongoose.Schema.Types.ObjectId[] | User[];
}

export type ProjectDocument = Project & Document;

export const ProjectSchema = SchemaFactory.createForClass(Project);