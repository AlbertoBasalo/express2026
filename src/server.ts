import express, { type Request, type Response } from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get(`/`, (_req: Request, res: Response) => {
	res.status(200).send(`Welcome to a TypeScript backend`);
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
