import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateCertificateDTO } from "./dto/createCertificate.dto";
import { CertificateEntity } from "./entity/certificate.entity";
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

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async createCertificate(@UploadedFile() files, @Body() certificateData: CreateCertificateDTO) {
    return this.certificateService.createCertificate(files, certificateData)
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