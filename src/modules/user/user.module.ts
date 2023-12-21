import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UniqueEmailValidator } from "./validation/uniqueEmail.validator";
import { UserService } from "./user.service";
import { UserEntity } from "./entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository, UniqueEmailValidator]
})
export class UserModule { }