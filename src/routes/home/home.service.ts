import { homeRepository } from "./home.repository.js";

export const homeService = {
	getHome: async (): Promise<string> => {
		const content = await homeRepository.getHome();
		const { message } = JSON.parse(content);
		return message;
	},
};
