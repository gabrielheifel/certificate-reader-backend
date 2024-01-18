import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UniqueEmail, UniqueEmailValidator } from "./validation/uniqueEmail.validator";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserService, UniqueEmailValidator]
})
export class UserModule {

}