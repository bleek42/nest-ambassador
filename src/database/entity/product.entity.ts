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

@Entity('products')
export class ProductEntity extends BaseEntity {
  constructor(dto: Partial<ProductEntity>) {
    super();
    Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn('identity')
  id: number;

  @PrimaryGeneratedColumn('uuid')
  uuid: number | string;

  @Column({ unique: true })
  name: string;

  @Column({ default: 'no description available...', nullable: true })
  description: string | null;

  @Column({ default: null, nullable: true })
  category: string | null;

  @Column({ nullable: false })
  addedBy: string;

  @Column({})
  @CreateDateColumn({})
  created: Date;

  @Column({})
  @UpdateDateColumn()
  updated: Date;
}
