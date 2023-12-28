import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CertificateModule } from './certificate/certificate.module';

@Module({
  imports: [
    UserModule,
    CertificateModule,
    TypeOrmModule.forRoot(),
  ],
})
export class AppModule { }