class User {}

class CreateUserDto {
  username: string;
  password: string;
  fullname: string;
}

class UpdateUserDto {
  username: string;
  password: string;
}

export { User, CreateUserDto, UpdateUserDto };
