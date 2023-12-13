import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  ValidationPipe,
  UsePipes, Query
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserEntity } from "./user.entity";
import { CustomValidationPipe } from "./pipes/validator.pipe";
import { UsersService } from "./users.service";
import { UserResponseDto } from "./dtos/user-response.dto";

@Controller('users')
// @UsePipes(ValidationPipe)

export class UsersController {

  constructor(private readonly userService: UsersService) {}

  // @Query('username', CustomValidationPipe) username: string
  @Get()
  findAll(): UserEntity[] {
    return this.userService.findUsers();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): UserEntity {
    return this.userService.findUserById(id);
  }


  // create(@Body(ValidationPipe) userData: CreateUserDto)
  // create( @Body(new ValidationPipe({ groups: ['create'] })) )
  @Post()
  create(@Body() userData: CreateUserDto): UserResponseDto {
    return this.userService.createUser(userData);
  }

  // @UsePipes(ValidationPipe)
  // update( @Body(new ValidationPipe({ groups: ['update'] })) )
  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, @Body() userData: UpdateUserDto): UserResponseDto {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.removeUser(id);
  }
}