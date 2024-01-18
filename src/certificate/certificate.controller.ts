import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateCertificateDTO } from "./dto/createCertificate.dto";
import { CertificateEntity } from "./entity/certificate.entity";
import { v4 as uuid } from "uuid";
import { UserEntity } from "src/user/entity/user.entity";
import { CertificateService } from "./certificate.service";
import { CertificateRepository } from "./certificate.repository";
import { UpdateCertificateDTO } from "./dto/updateCertificate.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('/certificate')
export class CertificateController {

  constructor(
    private readonly certificateService: CertificateService,
    private certificateRepository: CertificateRepository
  ) { }

  @Post('/teste')
  @UseInterceptors(FileInterceptor('file'))
  async teste(@UploadedFile() file) {
    return this.certificateService.createCertificate(file)
  }

  @Post()
  async createCertificate(@Body() certificateData: CreateCertificateDTO) {
    const certificateEntity = new CertificateEntity();

    certificateEntity.id = uuid();
    certificateEntity.type = certificateData.type
    certificateEntity.name = certificateData.name
    certificateEntity.activityName = certificateData.activityName
    certificateEntity.workLoad = certificateData.workLoad
    certificateEntity.days = certificateData.days
    certificateEntity.date = certificateData.date
    certificateEntity.issuingOrganization = certificateData.issuingOrganization

    this.certificateRepository.save(UserEntity);
    return {
      certificate: certificateEntity,
      message: "certificate created successfully!"
    }
  }

  @Get()
  async listCertificates(): Promise<CertificateEntity[]> {
    return this.certificateService.listCertificates();
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateCertificateDTO): Promise<CertificateEntity> {
    return this.certificateService.updateUser(id, newData)
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<CertificateEntity> {
    return this.certificateService.deleteUser(id)
  }
}