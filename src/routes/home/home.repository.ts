// export a function that reads the home content form a json file and returns it as a string
import { readFile } from "fs/promises";
import { join } from "path";

export const homeRepository = {
	getHome: async (): Promise<string> => {
		const filePath = join(process.cwd(), "data", "home.content.json");
		const content = await readFile(filePath, "utf-8");
		return content;
	},
};
