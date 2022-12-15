import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductEntity } from 'src/database/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async findAllProducts(options) {
    await this.productRepository.find(options);
  }

  public async findOneProductByid(id) {
    console.info(id);
    await this.productRepository.findOne(id);
  }

  public async createNewProduct(prod: Partial<ProductEntity>) {
    const isExistingProd = await this.productRepository.findOneOrFail()
  }

  public async updateOneProduct() {}
}
