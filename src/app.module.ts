import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './user/jwt-auth.guard.';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from './user/user.model';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ScreenCastController } from './screenCast/screen-cast.controller'; // Import the ScreenCastController
import { ScreenCastService } from './screenCast/screen-cast.service'; // Import the ScreenCastService
import { ScreenCast, ScreenCastSchema } from './screenCast/screen-cast.model'; // Import the ScreenCast model
import { CompanyService } from './company/company.service';
import { CompanyController } from './company/company.controller';
import { Company, CompanySchema } from './company/company.model';
import { ProjectService } from './project/project.service';
import { ProjectController } from './project/project.controller';
import { Project, ProjectSchema } from './project/project.model';

@Module({
  imports: [
    ConfigModule.forRoot(), // Import ConfigModule here

    // Retrieve the database URL from the config service
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: ScreenCast.name, schema: ScreenCastSchema}]), // Add the ScreenCast model
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]), // Add the ScreenCast model
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]), // Add the ScreenCast model


    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController, ScreenCastController, CompanyController, ProjectController], // Add ScreenCastController to the controllers array
  providers: [UserService, JwtStrategy, ScreenCastService, CompanyService,ProjectService], // Add ScreenCastService to the providers array
})
export class AppModule {}
