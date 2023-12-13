import { Exclude, Expose } from "class-transformer";

export class UserResponseDto {
  id: number;
  username: string;

  // @Expose({name: 'Email'})
  @Exclude()
  email: string;

  @Expose({name: 'Email'})
  get getEmail(): string {
    return `${this.email}`;
  }

  @Exclude()
  password: string;

  constructor(newUser: Partial<UserResponseDto>) {
    Object.assign(this, newUser)
  }
}