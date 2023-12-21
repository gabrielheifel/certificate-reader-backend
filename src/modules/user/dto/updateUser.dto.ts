import { IsString, IsEmail, MinLength, IsNumber, IsOptional } from "class-validator";
import { UniqueEmail } from "../validation/uniqueEmail.validator";

export class UpdateUserDTO {

  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @UniqueEmail({ message: "User already created with this email" })
  @IsOptional()
  email: string;

  @MinLength(4)
  @IsOptional()
  password: string;

  @IsNumber()
  @IsOptional()
  registration: number;

  @IsOptional()
  isAdm: boolean;
}