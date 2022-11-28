import { Controller, Get } from '@nestjs/common';

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
    return this.productService.findOneProductByid(id);
  }
}
