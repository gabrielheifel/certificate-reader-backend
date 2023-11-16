import { IsString, IsNumber, IsDate, IsUUID, IsOptional } from "class-validator";

export class CreateCertificateDTO {

  // @IsUUID(undefined, { message: 'Certificate ID invalid' })
  id: string;

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
  days: string;

  // @IsDate()
  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  issuingOrganization: string;

  @IsNumber()
  @IsOptional()
  assessment: number;
}