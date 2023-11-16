import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UserEntity } from "./entity/user.entity";
import { v4 as uuid } from "uuid";
import { ListUserDTO } from "./dto/listUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";

@Controller('/users')
export class UserController {

  constructor(private userRepository: UserRepository) { }

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
    const usersArray = await this.userRepository.list();
    const usersList = usersArray.map(
      user => new ListUserDTO(
        user.id,
        user.name
      )
    )

    return usersList;
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