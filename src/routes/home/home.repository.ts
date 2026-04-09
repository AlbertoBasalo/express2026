import { readJsonFile } from "../../shared/file.utils.js";

const HOME_CONTENT_FILE_NAME = "home.content.json";

export type HomeContent = {
	message: string;
};

export class HomeRepository {
	async readHomeContent(): Promise<HomeContent> {
		return readJsonFile<HomeContent>(HOME_CONTENT_FILE_NAME);
	}
}
