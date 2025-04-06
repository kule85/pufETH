import { Module } from '@nestjs/common';
import { PufethConversionRateController } from './pufeth-conversion-rate.controller';
import { PufethConversionRateService } from './pufeth-conversion-rate.service';

@Module({
	controllers: [PufethConversionRateController],
	providers: [PufethConversionRateService],
})
export class PufethConversionRateModule {}
