import { Controller, Sse } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { interval, map, Observable } from 'rxjs';
import { PufethConversionRateService } from './pufeth-conversion-rate.service';

@Controller('pufeth-conversion-rate')
export class PufethConversionRateController {
  constructor(
    private readonly pufethConversionRateService: PufethConversionRateService
  ) {}

  @Sse()
  async getConversionRateHttp(): Promise<Observable<MessageEvent>> {
    const rate = await this.pufethConversionRateService.getConversionRate();

    return interval(5000).pipe(
      map((_) => ({ data: { rate: 2 } } as MessageEvent))
    );
  }

  @MessagePattern('get_conversion_rate')
  async getConversionRate() {
    const rate = await this.pufethConversionRateService.getConversionRate();
    return { rate };
  }
}
