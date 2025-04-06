import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { pufethAbi } from './pufeth-abi';

@Injectable()
export class PufethConversionRateService {
	private provider: ethers.JsonRpcProvider;
	private contract: ethers.Contract;

	constructor() {
		this.provider = new ethers.JsonRpcProvider(
			`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
		);
		this.contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, pufethAbi, this.provider);
	}

	async getConversionRate(): Promise<number> {
		const totalAssets = await this.contract.totalAssets();
		const totalSupply = await this.contract.totalSupply();
		const decimals = await this.contract.decimals();

		return (
			Number(ethers.formatUnits(totalAssets, Number(decimals))) /
			Number(ethers.formatUnits(totalSupply, Number(decimals)))
		);
	}
}
