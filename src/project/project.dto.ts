import { UserDto, UserResponseDto } from '../user/user.dto'; // Import the UserDto

export class projectDto {
  readonly name: string;
  readonly company: string;
  readonly users: UserDto[];

}

export class ProjectResponseDto {
  readonly name: string;
}
