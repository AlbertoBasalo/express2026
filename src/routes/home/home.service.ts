import { HomeRepository } from "./home.repository.js";

export class HomeService {
	constructor(private readonly repository = new HomeRepository()) {}

	async getHome(): Promise<string> {
		const homeContent = await this.repository.readHomeContent();
		const message = homeContent.message || "Hello World!";
		const timestamp = new Date().toISOString();
		return `${message} ${timestamp}`;
	}
}
