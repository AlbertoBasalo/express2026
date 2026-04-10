export interface Logger {
	info: (message: string) => void;
	error: (message: string, error?: unknown) => void;
}

export const consoleLogger: Logger = {
	info: (message: string): void => {
		console.log("[INFO] ", message);
	},
	error: (message: string, error?: unknown): void => {
		console.error("[ERR!] ", message, error);
	},
};
