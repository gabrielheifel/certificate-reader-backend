import { BaseEntity } from "src/modules/base/entity/base.entity";
import { Column, Entity } from "typeorm";

Entity({ name: "certificates" })
export class CertificateEntity extends BaseEntity {

  certificate: string;

  @Column({ name: 'type', nullable: true })
  type: string;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'activity_name', nullable: true })
  activityName: string;

  @Column({ name: 'work_load', nullable: true })
  workLoad: string;

  @Column({ name: 'days', nullable: true })
  days: string;

  @Column({ name: 'date', nullable: true })
  date: string;

  @Column({ name: 'issuing_organization', nullable: true })
  issuingOrganization: string;

  @Column({ name: 'assessment', nullable: true })
  assessment: number;
}