export interface AppConfig {
	port: number;
	nodeEnv: string;
}

const PORT_ENV_KEY = "PORT";
const NODE_ENV_KEY = "NODE_ENV";

const parsePort = (value: string | undefined): number => {
	const parsedPort = Number(value);
	const isInvalidPort = !value || Number.isNaN(parsedPort) || parsedPort <= 0;
	if (isInvalidPort) {
		return 3000;
	}
	return parsedPort;
};

export const appConfig: AppConfig = {
	port: parsePort(process.env[PORT_ENV_KEY]),
	nodeEnv: process.env[NODE_ENV_KEY] ?? "production",
};
