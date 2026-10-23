import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";
import { forgeNames, parseSeed, seededRandom, pluralize } from "../src/generator.js";

let server;
let base;
before(async () => {
  server = createApp().listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

test("same seed forges the same names", () => {
  assert.deepEqual(forgeNames("band", 42), forgeNames("band", 42));
  assert.notDeepEqual(forgeNames("band", 42), forgeNames("band", 43));
});

test("forgeNames returns unique names and rejects unknown types", () => {
  const names = forgeNames("startup", 7);
  assert.equal(new Set(names).size, names.length);
  assert.throws(() => forgeNames("dragon", 1), RangeError);
});

test("seededRandom stays in [0, 1)", () => {
  const random = seededRandom(123);
  for (let i = 0; i < 1000; i++) {
    const value = random();
    assert.ok(value >= 0 && value < 1);
  }
});

test("parseSeed rejects junk", () => {
  assert.equal(parseSeed("99"), 99);
  const fallback = parseSeed("<script>");
  assert.ok(Number.isInteger(fallback));
});

test("POST /forge redirects to a shareable URL", async () => {
  const res = await fetch(`${base}/forge`, {
    method: "POST",
    redirect: "manual",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "type=tavern",
  });
  assert.equal(res.status, 303);
  assert.match(res.headers.get("location"), /^\/\?type=tavern&seed=\d+$/);
});

test("GET with seed renders names server-side, escaped", async () => {
  const html = await (await fetch(`${base}/?type=tavern&seed=5`)).text();
  for (const name of forgeNames("tavern", 5)) {
    const escaped = name.replace(/&/g, "&amp;").replace(/'/g, "&#39;");
    assert.ok(html.includes(escaped), `missing ${name}`);
  }
});

test("unknown type falls back to band", async () => {
  const html = await (await fetch(`${base}/?type=<b>x</b>`)).text();
  assert.match(html, /Forge a <span>band<\/span> name/);
  assert.doesNotMatch(html, /<b>x<\/b>/);
});

test("404 page renders", async () => {
  const res = await fetch(`${base}/missing`);
  assert.equal(res.status, 404);
});

test("pluralize handles common English endings", () => {
  assert.deepEqual(["Wolf", "Echo", "Prophet", "Rickshaw", "Riot"].map(pluralize), ["Wolves", "Echoes", "Prophets", "Rickshaws", "Riots"]);
  assert.equal(pluralize("Comet"), "Comets");
});
