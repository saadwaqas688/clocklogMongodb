import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument, CompanySchema } from './company.model';
import { CompanyDto, CompanyResponseDto } from './company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {}

  async getAllCompanies(): Promise<CompanyResponseDto[]> {
    const companies = await this.companyModel.aggregate([
      {
        $lookup: {
          from: 'users', // The name of the User collection
          localField: '_id', // The field from the Company collection to match
          foreignField: 'company', // The field from the User collection to match
          as: 'users', // The name of the field to store the matched users
        },
      },
      {
        $lookup: {
          from: 'projects', // The name of the Project collection
          localField: '_id', // The field from the Company collection to match
          foreignField: 'company', // The field from the Project collection to match
          as: 'projects', // The name of the field to store the matched projects
        },
      },
      {
        $project: {
          name: 1, // Include the "name" field from the Company collection
          users: { $map: { input: '$users', as: 'user', in: { _id: '$$user._id', username: '$$user.username' } } }, // Map the "users" array to only include "username" and "_id" fields
          projects: { $map: { input: '$projects', as: 'project', in: { _id: '$$project._id', projectname: '$$project.name' } } }, // Include the "projects" array
        },
      },
    ]);

    return companies;
  }
  async getCompanyById(id: string): Promise<Company> {
    const company = await this.companyModel.findById(id).exec();
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async createCompany(companyDto: CompanyDto): Promise<CompanyResponseDto> {
    const newCompany = new this.companyModel(companyDto);
    const savedCompany = await newCompany.save();
    return savedCompany;
  }
}

