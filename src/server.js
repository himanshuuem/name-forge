import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 3000);
const server = createApp().listen(port, () => console.log(`🔥 Name Forge running at http://localhost:${port}`));

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
