import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PufethConversionRateModule } from './pufeth-conversion-rate/pufeth-conversion-rate.module';

@Module({
  imports: [PufethConversionRateModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
