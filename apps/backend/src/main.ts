/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import {
  CorsOptions,
  CorsOptionsCallback,
} from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { Request } from 'express';

import { AppModule } from './app/app.module';

const configCors = (app: INestApplication, origins: string[]): void => {
  const corsOptionsDelegate = function (
    req: Request,
    callback: CorsOptionsCallback
  ): void {
    let corsOptions: CorsOptions;
    if (origins.indexOf(req.header('Origin') as string) !== -1) {
      corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };

  app.enableCors(corsOptionsDelegate);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const origins = ['http://localhost:4200'];
  configCors(app, origins);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
