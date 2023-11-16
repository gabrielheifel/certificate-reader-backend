import { Module } from "@nestjs/common";
import { CertificateController } from "./certificate.controller";
import { CertificateRepository } from "./certificate.repository";

@Module({
  controllers: [CertificateController],
  providers: [CertificateRepository]
})
export class CertificateModule {

}