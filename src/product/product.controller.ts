import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ProductEntity } from 'src/database/entity/product.entity';

import { ProductService } from './product.service';

@Controller('products')
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

  @Post('create')
  public async postProduct(@Body() prodBody: unknown) {
    return;
  }

  @Patch('products/:id')
  public async updateProductById(@Body() prodBody: unknown) {
    return;
  }

  @Delete('products/:id')
  public async deleteProductById(@Body() prodBody: unknown) {
    return;
  }
}
