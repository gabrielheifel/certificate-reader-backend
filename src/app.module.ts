import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CertificateModule } from './certificate/certificate.module';

@Module({
  imports: [UserModule, CertificateModule],
})
export class AppModule { }
