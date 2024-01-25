import { IsString, IsNumber, IsOptional } from "class-validator";

export class UpdateCertificateDTO {

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