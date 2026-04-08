import { expect, test } from "vitest";
import { PORT } from "./server.js";

test("port should be 3000", () => {
	expect(PORT).toBe(3000);
});
