import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { InternalServerError } from "./error.class.js";

const DATA_FOLDER = "data";

export const readJsonFile = async <T>(fileName: string): Promise<T> => {
	const filePath = join(process.cwd(), DATA_FOLDER, fileName);
	try {
		const content = await readFile(filePath, "utf-8");
		return JSON.parse(content) as T;
	} catch {
		throw new InternalServerError(`Failed to read data file "${fileName}"`);
	}
};
