import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { File } from "buffer";
import { IsString, IsNumber, IsOptional } from "class-validator";

export class UpdateCertificateDTO {

  file: any;

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

// export const uploadOptions: MulterOptions = {
//   dest: './uploads',
// };