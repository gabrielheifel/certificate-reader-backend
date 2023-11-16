import { Injectable } from "@nestjs/common";
import { CertificateEntity } from "./entity/certificate.entity";

@Injectable()
export class CertificateRepository {
  private certificates: CertificateEntity[] = [];

  async save(certificate) {
    this.certificates.push(certificate);
  }

  async list() {
    return this.certificates
  }

  private findCertificateById(id: string) {
    const certificateFound = this.certificates.find(
      certificateSaved => certificateSaved.id === id
    )

    if (!certificateFound) {
      throw new Error('User do not exist!')
    }

    return certificateFound;
  }

  async update(id: string, newData: Partial<CertificateEntity>) {
    const certificateFound = this.findCertificateById(id)

    Object.entries(newData).forEach(([key, value]) => {
      if (key === 'id') return

      certificateFound[key] = value
    })

    return certificateFound;
  }

  async delete(id: string) {
    const certificateFound = this.findCertificateById(id)
    this.certificates = this.certificates.filter(
      certificate => certificate.id !== id
    )

    return certificateFound;
  }
}