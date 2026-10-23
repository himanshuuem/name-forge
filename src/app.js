import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { FORGES, FORGE_KEYS } from "./words.js";
import { forgeNames, newSeed, parseSeed } from "./generator.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.set("view engine", "ejs");
  app.set("views", path.join(root, "views"));
  app.use(express.static(path.join(root, "public")));
  app.use(express.urlencoded({ extended: false, limit: "1kb" }));

  // Values every view can use.
  app.use((req, res, next) => {
    res.locals.forges = FORGES;
    res.locals.forgeKeys = FORGE_KEYS;
    res.locals.year = new Date().getFullYear();
    next();
  });

  app.get("/", (req, res) => {
    const type = FORGE_KEYS.includes(req.query.type) ? req.query.type : "band";
    const hasSeed = req.query.seed !== undefined;
    const seed = parseSeed(req.query.seed);
    res.render("index", {
      type,
      seed,
      names: hasSeed ? forgeNames(type, seed) : [],
      shareUrl: `${req.protocol}://${req.get("host")}/?type=${type}&seed=${seed}`,
    });
  });

  // POST-redirect-GET: the form submits here, and the result lives at a shareable URL.
  app.post("/forge", (req, res) => {
    const type = FORGE_KEYS.includes(req.body.type) ? req.body.type : "band";
    res.redirect(303, `/?type=${type}&seed=${newSeed()}`);
  });

  app.get("/health", (req, res) => res.json({ status: "ok" }));

  app.use((req, res) => res.status(404).render("404"));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render("404", { message: "The forge overheated. Please try again." });
  });

  return app;
}
