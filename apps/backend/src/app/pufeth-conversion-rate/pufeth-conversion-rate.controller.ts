import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PufethConversionRateService } from './pufeth-conversion-rate.service';

@Controller('pufeth-conversion-rate')
export class PufethConversionRateController {
  constructor(
    private readonly pufethConversionRateService: PufethConversionRateService
  ) {}

  // HTTP endpoint for React (or any HTTP client) to call
  @Get()
  async getConversionRateHttp() {
    const rate = await this.pufethConversionRateService.getConversionRate();
    return { rate };
  }

  // Microservice message handler (will be listening for TCP messages)
  @MessagePattern('get_conversion_rate')
  async getConversionRate() {
    const rate = await this.pufethConversionRateService.getConversionRate();
    return { rate };
  }
}
