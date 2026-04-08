import express from "express";
import { homeController } from "./routes/home/home.controller.js";

const app = express();
export const PORT = 3000;
app.use(express.json());
app.get(`/`, homeController.getHome);
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
