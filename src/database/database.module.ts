import { Module } from '@nestjs/common';
import { Controller } from './.controller';

@(new Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.HOST,
        port: parseInt(process.env.PORT) || 3306,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [`${__dirname}/**/*/*.entity{ .ts, .js }`],
        synchronize: true,
      }),
      imports: undefined,
    }),
  ],
}))
export class Module {}
