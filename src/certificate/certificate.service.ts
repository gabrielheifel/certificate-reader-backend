import { Injectable } from '@nestjs/common';
import { createScheduler, createWorker } from 'tesseract.js';
import { CertificateRepository } from './certificate.repository';
import { UpdateCertificateDTO } from './dto/updateCertificate.dto';
import { CertificateEntity } from './entity/certificate.entity';
import { CreateCertificateDTO } from './dto/createCertificate.dto';

@Injectable()
export class CertificateService {

  constructor(
    private certificateRepository: CertificateRepository,
    // private userRepository: UserRepository
  ) { }

  async createCertificate(files, certificateData?: CreateCertificateDTO) {

    const newCertificate = new CertificateEntity();

    console.log(files.length)

    if (files.length > 1) {
      try {
        const scheduler = createScheduler();
        const workerGen = async () => {
          const worker = await createWorker("por+eng", 1, { cachePath: "." });
          scheduler.addWorker(worker);
        }
        const workerN = files.length;

        const resArr = Array(workerN);
        for (let i = 0; i < workerN; i++) {
          resArr[i] = workerGen();
        }
        await Promise.all(resArr);

        const resArr2 = Array(files.length);

        for (let i = 0; i < files.length; i++) {
          resArr2[i] = scheduler.addJob('recognize', files[i]).then((x) => console.log(x.data.text));
        }

        await Promise.all(resArr2);

        await scheduler.terminate();

      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {

      try {
        const { path, buffer } = files || {};

        if (!path && !buffer) {
          throw new Error("O arquivo não foi fornecido corretamente");
        }

        const worker = await createWorker('por+eng', 1, {
          logger: m => console.log(m), // Add logger here
        });

        const { data: { text } } = await worker.recognize(path || buffer);
        await worker.terminate();

        newCertificate.type = this.getType(text, certificateData.type);
        newCertificate.name = this.getName(text, certificateData.name);
        newCertificate.activityName = this.getActivityName(text, certificateData.activityName);
        newCertificate.workLoad = this.getWorkLoad(text, certificateData.workLoad);
        newCertificate.days = this.getDays(text, certificateData.days);
        newCertificate.hours = this.getHours(text, certificateData.hours);
        newCertificate.date = this.getDate(text, certificateData.date);
        newCertificate.issuingOrganization = this.getIssuingOrganization(text, certificateData.issuingOrganization);
        newCertificate.assessment = this.getAssessment(text, certificateData.assessment);
        console.log(newCertificate)

        this.certificateRepository.save(newCertificate);

      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    return newCertificate;

    // const { data1: { texte } } = await worker.getPDF


  }

  private getStringToFind(text: string, stringToFind: string): string {
    let foundString = null;
    stringToFind = stringToFind.toLocaleLowerCase();

    const regex = new RegExp(stringToFind, 'g');
    const matches = text.toLocaleLowerCase().match(regex);
    if (matches) foundString = matches[0];

    return foundString;
  }

  private getType(text: string, typeToFind: string): string {
    let foundType = null;

    // if (nameToFind && nameToFind == this.userRepository.findByName(nameToFind)) {
    if (typeToFind) {
      foundType = this.getStringToFind(text, typeToFind);
      if (foundType) foundType = foundType.replace(/\b\w/g, match => match.toUpperCase());
    }

    return foundType;
  }

  private getName(text: string, nameToFind: string): string {
    let foundName = null;

    // if (nameToFind && nameToFind == this.userRepository.findByName(nameToFind)) {
    if (nameToFind) {
      foundName = this.getStringToFind(text, nameToFind);
      if (foundName) foundName = foundName.replace(/\b\w/g, match => match.toUpperCase());
    }

    return foundName;
  }

  private getActivityName(text: string, activityNameToFind: string): string {
    let foundActivityName = null;

    if (activityNameToFind) {
      foundActivityName = this.getStringToFind(text, activityNameToFind);
      if (foundActivityName) foundActivityName = foundActivityName.replace(/\b\w/g, match => match.toUpperCase());
    }

    return foundActivityName;
  }

  private getWorkLoad(text: string, workLoadToFind: string): string {
    let foundWorkLoad = null;

    if (workLoadToFind) {
      foundWorkLoad = this.getStringToFind(text, workLoadToFind);
      if (foundWorkLoad) foundWorkLoad = foundWorkLoad.replace(/\b\w/g, match => match.toUpperCase());
    }

    return foundWorkLoad;
  }

  private getDays(text: string, datesToFind?: string[]): string[] {
    const possibleFormats = [
      'dd/MM/yyyy',
      // 'MM/dd/yyyy',
      'dd-MM-yyyy',
      'MM-dd-yyyy',
      'yyyy-MM-dd',
      'yyyy/MM/dd',
      'dd MMMM yyyy',
      'MMMM dd, yyyy',
      'dd MMMM yyyy',
    ];

    let foundDates: string[] = [];

    if (datesToFind) foundDates = datesToFind.filter(date => text.includes(date));

    if (foundDates.length === 0) {
      possibleFormats.forEach(format => {
        const regex = new RegExp(`\\b(?:${format.replace(/\s+/g, '\\s+').replace(/[dMy]/g, '\\d')})\\b`, 'g');
        const matches = text.match(regex);

        if (matches) {
          foundDates.push(...matches);
        }
      });
    }

    return foundDates;
  }

  private getHours(text: string, hoursToFind: string): string {
    let foundHours = null;

    if (hoursToFind) {
      foundHours = this.getStringToFind(text, hoursToFind);
    }

    return foundHours;
  }

  private getDate(text: string, dateToFind: string): string {
    let foundDate = null;

    if (dateToFind) {
      foundDate = this.getStringToFind(text, dateToFind);
    }

    return foundDate;
  }

  private getIssuingOrganization(text: string, issuingOrganizationToFind: string): string {
    let foundIssuingOrganization = null;

    if (issuingOrganizationToFind) {
      foundIssuingOrganization = this.getStringToFind(text, issuingOrganizationToFind);
      if (foundIssuingOrganization) {
        foundIssuingOrganization = foundIssuingOrganization.replace(/\b\w/g, match => match.toUpperCase());
      }
    }

    return foundIssuingOrganization;
  }

  private getAssessment(text: string, assessmentToFind: string): string {
    let foundAssessment = null;

    if (assessmentToFind) {
      foundAssessment = this.getStringToFind(text, assessmentToFind);
      if (foundAssessment) foundAssessment = foundAssessment.replace(/\b\w/g, match => match.toUpperCase());
    }

    return foundAssessment;
  }

  async listCertificates(): Promise<CertificateEntity[]> {
    return this.certificateRepository.list();
  }

  async updateUser(id: string, newData: UpdateCertificateDTO): Promise<CertificateEntity> {
    return await this.certificateRepository.update(id, newData);
  }

  async deleteUser(id: string): Promise<CertificateEntity> {
    return await this.certificateRepository.delete(id);
  }
}
