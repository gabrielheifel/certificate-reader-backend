import { Module } from "@nestjs/common";
import { CertificateController } from "./certificate.controller";
import { CertificateRepository } from "./certificate.repository";
import { CertificateService } from './certificate.service';
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [MulterModule.register()],
  controllers: [CertificateController],
  providers: [CertificateRepository, CertificateService, CertificateService]
})
export class CertificateModule {

}