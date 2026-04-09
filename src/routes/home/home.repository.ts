import { readJsonFile } from "../../shared/file.utils.js";

export interface HomeRepository {
	readHomeContent: () => Promise<HomeContent>;
}
export type HomeContent = {
	message: string;
};

export const homeRepository: HomeRepository = {
	readHomeContent: async (): Promise<HomeContent> => {
		return readJsonFile<HomeContent>("home.content.json");
	},
};
