import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.HOST,
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DB_NAME,
        entities: [`${__dirname}/**/*/*.entity{ .ts, .js }`],
        synchronize: true,
      }),
      imports: undefined,
    }),
  ],
})

export class DatabaseModule {}
