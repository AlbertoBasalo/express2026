import express from "express";
import { homeController } from "./routes/home/home.controller.js";
const app = express();
export const PORT = 3000;
app.use(express.json());
app.use((_req, res, next) => {
    try {
        next();
    }
    catch (error) {
        handleError(error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
});
app.get(`/`, homeController.getHome);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
function handleError(error) {
    console.error("An error occurred:", error);
}
//# sourceMappingURL=server.js.map