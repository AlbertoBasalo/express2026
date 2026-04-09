import { readJsonFile } from "../../shared/file.utils.js";

const HOME_CONTENT_FILE_NAME = "home.content.json";

export interface HomeRepository {
	readHomeContent: () => Promise<HomeContent>;
}

export type HomeContent = {
	message: string;
};

export const homeRepository: HomeRepository = {
	readHomeContent: async (): Promise<HomeContent> => {
		return readJsonFile<HomeContent>(HOME_CONTENT_FILE_NAME);
	},
};
