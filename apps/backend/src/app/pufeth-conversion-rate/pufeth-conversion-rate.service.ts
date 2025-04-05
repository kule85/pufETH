import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { pufethAbi } from './pufeth-abi';

const contractAddress = '0xD9A442856C234a39a81a089C06451EBAa4306a72';

@Injectable()
export class PufethConversionRateService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      'https://mainnet.infura.io/v3/ea2101763ef8491a9677e0a691d7a8f2'
    );
    this.contract = new ethers.Contract(
      contractAddress,
      pufethAbi,
      this.provider
    );
  }

  async getConversionRate(): Promise<number> {
    const totalAssets = await this.contract.totalAssets();
    const totalSupply = await this.contract.totalSupply();

    return (
      Number(ethers.formatUnits(totalAssets, 18)) /
      Number(ethers.formatUnits(totalSupply, 18))
    );
  }
}
