import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import argon2, { Options } from '@node-rs/argon2';
@Entity('users')
export class UserEntity extends BaseEntity {
  constructor(dto: Partial<UserEntity>) {
    super();
    Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn('identity')
  id: number;

  @PrimaryGeneratedColumn('uuid')
  uuid: number | string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  ambassador: boolean;

  @Column({ default: false })
  admin: boolean;

  @Column()
  @CreateDateColumn()
  created: Date;

  @Column()
  @UpdateDateColumn()
  updated: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const opts: Options = {
      algorithm: 0,
      version: 1,
    };
    this.password = await argon2.hash(this.password, opts);
  }
}
