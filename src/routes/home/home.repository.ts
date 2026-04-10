import { readJsonFile } from "../../shared/file.utils.js";
import type { HomeContent } from "./home-content.type.js";

const HOME_CONTENT_FILE_NAME = "home.content.json";

export class HomeRepository {
	async readHomeContent(): Promise<HomeContent> {
		return readJsonFile<HomeContent>(HOME_CONTENT_FILE_NAME);
	}
}
