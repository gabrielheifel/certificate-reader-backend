import { Injectable } from "@nestjs/common";
import { UserEntity } from "./entity/user.entity";

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users
  }

  async alreadyExists(email: string) {
    const couldBeUser = this.users.find(
      user => user.email === email
    );

    return couldBeUser != undefined;
  }

  private findUserById(id: string) {
    const userFound = this.users.find(
      userSaved => userSaved.id === id
    )

    if (!userFound) {
      throw new Error('User do not exist!')
    }

    return userFound;
  }

  async update(id: string, newData: Partial<UserEntity>) {
    const userFound = this.findUserById(id)

    Object.entries(newData).forEach(([key, value]) => {
      if (key === 'id') return

      userFound[key] = value
    })

    return userFound;
  }

  async delete(id: string) {
    const userFound = this.findUserById(id)
    this.users = this.users.filter(user => user.id !== id)

    return userFound;
  }
}