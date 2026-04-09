import type { HomeContent, HomeRepository } from "./home.repository.js";
import { homeRepository } from "./home.repository.js";

export interface HomeService {
	getHome: () => Promise<string>;
}
export const createHomeService = (
	repository: HomeRepository = homeRepository,
): HomeService => {
	return {
		getHome: async (): Promise<string> => {
			const content: HomeContent = await repository.readHomeContent();
			const message = content.message;
			const timestamp = new Date().toISOString();
			return `${message} ${timestamp}`;
		},
	};
};
