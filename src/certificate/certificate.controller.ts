import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CertificateRepository } from "./certificate.repository";
import { CreateCertificateDTO } from "./dto/createCertificate.dto";
import { CertificateEntity } from "./entity/certificate.entity";
import { v4 as uuid } from "uuid";
import { UserEntity } from "src/user/entity/user.entity";
import { UpdateUserDTO } from "src/user/dto/updateUser.dto";

@Controller('/certificate')
export class CertificateController {

  constructor(private certificateRepository: CertificateRepository) { }

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
  async listCertificate() {
    return this.certificateRepository.list();
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedCertificate = await this.certificateRepository.update(id, newData)

    return {
      user: updatedCertificate,
      message: "certificate updated successfully!"
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedCertificate = await this.certificateRepository.delete(id)

    return {
      user: deletedCertificate,
      message: "certificate deleted successfully!"
    }
  }
}