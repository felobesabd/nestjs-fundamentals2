import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  // @Length(3, 20, { groups: ['create'] })
  // @Length(5, 20, { groups: ['update'] })
  @Length(3, 20)
  username: string;

  @IsEmail({}, {message: `invalid email`})
  email: string;

  @IsString()
  password: string;
}