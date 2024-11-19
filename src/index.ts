import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

const app = new Hono();

// Middlewares
app.use(logger()); // Enable logger
app.use(cors());

// MARK: Routes
app.get("/status", (c) => {
  return c.json({ message: "API is active 🔥" });
});

app.get("/", (c) => {
  const text = c.req.query("text");

  if (!text) {
    return c.json({ message: "Please provide text" }, 400);
  }

  const wordsCount = text.split(/\s+/).length;

  return c.json({ count: wordsCount });
});

app.post("/", async (c) => {
  const { text } = await c.req.json();

  if (!text) {
    return c.json({ message: "Please provide text" }, 400);
  }

  return c.json({ count: text.split(/\s+/).length });
});

export default app;
