import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule for environment variables
import { GeolocationModule } from './geolocation/geolocation.module';
import { Address } from './geolocation/address.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load .env variables
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Address],
      synchronize: true,
    }),
    GeolocationModule, // Import your Geolocation module
  ],
})
export class AppModule {}
