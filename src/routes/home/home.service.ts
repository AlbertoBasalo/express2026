import type { HomeContent } from "./home.repository.js";
import { HomeRepository } from "./home.repository.js";

export class HomeService {
	constructor(
		private readonly repository: HomeRepository = new HomeRepository(),
	) {}

	async getHome(): Promise<string> {
		const { message }: HomeContent = await this.repository.readHomeContent();
		const timestamp = new Date().toISOString();
		return `${message} ${timestamp}`;
	}
}
