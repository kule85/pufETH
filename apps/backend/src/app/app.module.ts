import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PufethConversionRateModule } from './pufeth-conversion-rate/pufeth-conversion-rate.module';

@Module({
  imports: [PufethConversionRateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
