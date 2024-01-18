import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { UserEntity } from "./entity/user.entity";
import { CreateUserDTO } from "./dto/createUser.dto";
import { hash } from "bcrypt";
import { UserRepository } from "./user.repository";
import { UpdateUserDTO } from "./dto/updateUser.dto";

@Injectable()
export class UserService {
  private users: UserEntity[] = [];
  constructor(private userRepository: UserRepository) { }

  async createUser(userData: CreateUserDTO): Promise<UserEntity> {
    const saltOrRounds = 10;

    const passwordHashed = await hash(userData.password, saltOrRounds);

    const user: UserEntity = {
      ...userData,
      id: uuid(),
      password: passwordHashed,
      isAdm: userData.isAdm ?? false
    }

    this.users.push(user)
    this.userRepository.save(user);

    return user;
  }

  async listUsers(): Promise<UserEntity[]> {
    return await this.userRepository.list();
  }

  async updateUser(id: string, newData: UpdateUserDTO): Promise<UserEntity> {
    return await this.userRepository.update(id, newData);
  }

  async deleteUser(id: string): Promise<UserEntity> {
    return await this.userRepository.delete(id);
  }
}

// const userEntity = new UserEntity();

// userEntity.id = uuid();
// userEntity.email = userData.email;
// userEntity.name = userData.name;
// userEntity.password = userData.password;
// userEntity.registration = userData.registration;
// userEntity.isAdm = userData.isAdm ?? false;


// this.userRepository.save(userEntity);

// return {
//   user: new ListUserDTO(userEntity.id, userEntity.name),
//   message: "user created successfully!"
// };