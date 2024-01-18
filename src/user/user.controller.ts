import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UserEntity } from "./entity/user.entity";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { UserService } from "./user.service";

@Controller('/users')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) { }

  @Post()
  async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUser)
  }

  @Get()
  async listUsers(): Promise<UserEntity[]> {
    return this.userService.listUsers()
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO): Promise<UserEntity> {
    return this.userService.updateUser(id, newData)
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.deleteUser(id)
  }
}