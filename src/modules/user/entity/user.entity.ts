import { BaseEntity } from "src/modules/base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'registration', nullable: false })
  registration: number;

  @Column({ name: 'isAdm', nullable: true })
  isAdm: boolean;
}