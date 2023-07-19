import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './company.dto';
import { JwtAuthGuard } from '../user/jwt-auth.guard.';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getAllCompanies(): Promise<any> {
    try {
      const companies = await this.companyService.getAllCompanies();
      return {
        message: 'Companies retrieved successfully',
        companies,
      };
    } catch (error) {
      return {
        message: 'Error retrieving companies',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async getCompanyById(@Param('id') id: string): Promise<any> {
    try {
      const company = await this.companyService.getCompanyById(id);
      return {
        message: 'Company retrieved successfully',
        company,
      };
    } catch (error) {
      return {
        message: 'Error retrieving company',
        error: error.message,
      };
    }
  }

  @Post('register')
  async createCompany(@Body() companyDto: CompanyDto): Promise<any> {
    try {
      const company = await this.companyService.createCompany(companyDto);
      return {
        message: 'Company created successfully',
        company,
      };
    } catch (error) {
      return {
        message: 'Error creating company',
        error: error.message,
      };
    }
  }
}
