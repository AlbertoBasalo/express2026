import { createApp } from "./app.factory.js";
import { appConfig } from "./env.config.js";
import { consoleLogger } from "./shared/logger.utils.js";

const app = createApp();
export const PORT = appConfig.port;
app.listen(PORT, () => {
	const mode = appConfig.nodeEnv;
	consoleLogger.info(
		`Server running at http://localhost:${PORT} in ${mode} mode`,
	);
});
//# sourceMappingURL=server.js.map
