import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';
import { CertificateRepository } from './certificate.repository';
import { UpdateCertificateDTO } from './dto/updateCertificate.dto';
import { CertificateEntity } from './entity/certificate.entity';

@Injectable()
export class CertificateService {

  constructor(private certificateRepository: CertificateRepository) { }

  async createCertificate(file) {

    const { path, buffer } = file;

    try {

      const worker = await createWorker('por');
      const { data: { text } } = await worker.recognize(path || buffer);

      console.log(text);

      const days = this.getDays(text);

      await worker.terminate();

    } catch (error) {
      console.error(error);
      throw error;
    }

    // const { data1: { texte } } = await worker.getPDF


  }

  private getDays(text: string) {
    return "tes"
  }

  async listCertificates(): Promise<CertificateEntity[]> {
    return this.certificateRepository.list();
  }

  async updateUser(id: string, newData: Partial<UpdateCertificateDTO>): Promise<CertificateEntity> {
    return await this.certificateRepository.update(id, newData);
  }

  async deleteUser(id: string): Promise<CertificateEntity> {
    return await this.certificateRepository.delete(id);
  }
}
