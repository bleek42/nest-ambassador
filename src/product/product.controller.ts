import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductEntity } from 'src/database/entity/product.entity';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('products')
  public async getAll(options) {
    return this.productService.findAllProducts(options);
  }

  @Get(':id')
  public async getById(id) {
    return await this.productService.findOneProductByid(id);
  }

  @Post('products/create')
  public async(@Body() prodBody: unknown) {
    return;
  }
}
