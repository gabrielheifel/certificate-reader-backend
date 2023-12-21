import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UserEntity } from "./entity/user.entity";
import { ListUserDTO } from "./dto/listUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { UserService } from "./user.service";

@Controller('/users')
export class UserController {

  constructor(
    private userRepository: UserRepository,
    private userService: UserService
  ) { }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();

    userEntity.id = uuid();
    userEntity.email = userData.email;
    userEntity.name = userData.name;
    userEntity.password = userData.password;
    userEntity.registration = userData.registration;
    userEntity.isAdm = userData.isAdm ?? false;


    this.userRepository.save(userEntity);
    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: "user created successfully!"
    };
  }

  @Get()
  async listUsers() {
    const usersSaved = await this.userService.listUsers();

    return usersSaved;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(id, newData)

    return {
      user: updatedUser,
      message: "user updated successfully!"
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userRepository.delete(id)

    return {
      user: deletedUser,
      message: "user deleted successfully!"
    }
  }
}