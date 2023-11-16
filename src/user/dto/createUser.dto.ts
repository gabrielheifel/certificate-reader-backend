import { IsString, IsEmail, MinLength, IsNumber, IsUUID } from "class-validator";
import { UniqueEmail } from "../validation/uniqueEmail.validator";

export class CreateUserDTO {

  // @IsUUID(undefined, { message: 'User ID invalid' })
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  @UniqueEmail({ message: "User already created with this email" })
  email: string;

  @MinLength(4)
  password: string;

  @IsNumber()
  registration: number;

  isAdm: boolean;
}