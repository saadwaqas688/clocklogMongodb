import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { projectDto } from './project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllProjects(): Promise<any> {
    try {
      const projects = await this.projectService.getAllProjects();
      return {
        message: 'Projects retrieved successfully',
        projects,
      };
    } catch (error) {
      return {
        message: 'Error retrieving companies',
        error: error.message,
      };
    }
  }

  // @Get(':id')
  // async getCompanyById(@Param('id') id: string): Promise<any> {
  //   try {
  //     const company = await this.companyService.getCompanyById(id);
  //     return {
  //       message: 'Company retrieved successfully',
  //       company,
  //     };
  //   } catch (error) {
  //     return {
  //       message: 'Error retrieving company',
  //       error: error.message,
  //     };
  //   }
  // }

  @Post('create')
  async createProject(@Body() projectDto: projectDto): Promise<any> {
    try {
      const company = await this.projectService.createCompany(projectDto);
      return {
        message: 'project created successfully',
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
