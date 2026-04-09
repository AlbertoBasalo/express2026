import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { AppError } from "./error.class.js";

const DATA_FOLDER = "data";
const READ_FAILED_CODE = "DATA_READ_FAILED";

export const readJsonFile = async <T>(fileName: string): Promise<T> => {
	const filePath = join(process.cwd(), DATA_FOLDER, fileName);

	try {
		const content = await readFile(filePath, "utf-8");
		return JSON.parse(content) as T;
	} catch {
		throw new AppError(
			500,
			`Failed to read data file "${fileName}"`,
			READ_FAILED_CODE,
		);
	}
};
