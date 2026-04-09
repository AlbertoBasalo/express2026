import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const readJsonFile = async <T>(fileName: string): Promise<T> => {
	const filePath = join(process.cwd(), "data", fileName);
	const content = await readFile(filePath, "utf-8");
	return JSON.parse(content) as T;
};
