export class ListCertificateDTO {
  constructor(
    readonly id: string,
    readonly file: File,
    readonly name: string,
    readonly type: string,
    readonly activityName: string,
    readonly workLoad: string,
    readonly days: string,
    readonly date: string,
    readonly issuingOrganization: string,
    readonly assessment: number,
  ) { }
}