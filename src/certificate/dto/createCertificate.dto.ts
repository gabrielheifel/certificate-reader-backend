import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { IsString, IsNumber, IsDate, IsUUID, IsOptional, IsUrl } from "class-validator";

export class CreateCertificateDTO {

  // @IsUUID(undefined, { message: 'Certificate ID invalid' })
  id: string;

  file: Blob[];

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  activityName: string;

  @IsNumber()
  @IsOptional()
  workLoad: string;

  @IsNumber()
  @IsOptional()
  days: string[];

  @IsOptional()
  hours: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  issuingOrganization: string;

  @IsNumber()
  @IsOptional()
  assessment: string;
}