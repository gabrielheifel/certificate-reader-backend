export class CertificateEntity {
  id: string;

  type: string;

  file: Blob[];

  name: string;

  activityName: string;

  workLoad: string;

  days: string[];

  hours: string;

  date: string;

  issuingOrganization: string;

  assessment: string;
}