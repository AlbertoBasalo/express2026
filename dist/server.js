import { createApp } from "./app.factory.js";
import { appConfig } from "./config/env.js";
import { consoleLogger } from "./shared/logger.utils.js";
const app = createApp();
export const PORT = appConfig.port;
app.listen(PORT, () => {
    consoleLogger.info(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map