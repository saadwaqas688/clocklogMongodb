export class UserDto {
  readonly username: string;
  readonly password: string;
  readonly role: string;

}

export class UserResponseDto {
  readonly id: string;
  readonly username: string;
  readonly role: string;
}
