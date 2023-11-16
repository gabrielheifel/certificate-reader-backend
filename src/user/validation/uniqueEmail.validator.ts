import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, isValidationOptions, registerDecorator } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {

  constructor(private userRepository: UserRepository) { }

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const userExists = await this.userRepository.alreadyExists(value);

    return !userExists;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error("Method not implemented.");
  }

}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
  return (obj: Object, property: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator
    })
  }
}