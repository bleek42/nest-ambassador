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
}
