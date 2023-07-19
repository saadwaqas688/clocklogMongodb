import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.model';
import { ProjectResponseDto, projectDto } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private readonly companyModel: Model<Project>,
  ) {}

  async getAllProjects(): Promise<ProjectResponseDto[]> {
    const companies = await this.companyModel.aggregate([
      {
        $lookup: {
          from: 'company', // The name of the User collection
          localField: '_id', // The field from the Company collection to match
          foreignField: 'company', // The field from the User collection to match
          as: 'company', // The name of the field to store the matched users
        },
      },
      {
        $project: {
          name: 1, // Include the "name" field from the Company collection
          users: { $map: { input: '$users', as: 'user', in: { _id: '$$user._id', username: '$$user.username' } } }, // Map the "users" array to only include "username" and "_id" fields
        },
      },
    ]);

    return companies;
  }
  async getCompanyById(id: string): Promise<Project> {
    const company = await this.companyModel.findById(id).exec();
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async createCompany(projectDto: projectDto): Promise<ProjectResponseDto> {
    const newCompany = new this.companyModel(projectDto);
    const savedCompany = await newCompany.save();
    return savedCompany;
  }
}
