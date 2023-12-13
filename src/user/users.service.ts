import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { userHabits } from "./users.constants";
import { UserResponseDto } from "./dtos/user-response.dto";

@Injectable()
export class UsersService {
  // constructor(@Inject('APP_NAME') private connect: string) {}
  constructor(@Inject(userHabits) private userHabits: string) {
    console.log(userHabits);
  }

  private users: UserEntity[] = [];

  findUsers(): UserEntity[] {
    // console.log(this.connect);
    return this.users;
  }

  findUserById(id: number): UserResponseDto {
    const user = this.users.find((item) => item.id === id);
    return new UserResponseDto(user);
  }

  createUser(userData: CreateUserDto): UserResponseDto {
    const newUser: UserEntity = {
      id: Math.ceil(Math.random() * 100),
      ...userData
    }

    this.users.push(newUser);

    return new UserResponseDto(newUser);
  }

  updateUser(id: number, userData: UpdateUserDto): UserResponseDto {
    const index = this.users.findIndex((item) => item.id === id);

    const data = {
      ...this.users[index],
      ...userData
    }

    this.users[index] = data;

    return new UserResponseDto(data);
  }

  removeUser(id: number) {
    this.users = this.users.filter((item) => item.id !== id);
  }
}