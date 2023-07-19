import { Company } from "../company/company.model";

export class UserDto {
  readonly username: string;
  readonly password: string;
  readonly company: string | Company;
  readonly role: string;
  readonly projects: string[];

}

export class UserResponseDto {
  readonly id: string;
  readonly username: string;
  readonly role: string;
  readonly company: string | Company;
}
