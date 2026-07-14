import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

function extractBlock(source, marker) {
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, `Missing CSS block: ${marker}`);

  const open = source.indexOf("{", start);
  let depth = 0;

  for (let index = open; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(open + 1, index);
  }

  throw new Error(`Unclosed CSS block: ${marker}`);
}

test("mobile header uses a valid non-overlapping two-column grid", () => {
  const mobile = extractBlock(css, "@media (max-width: 760px)");
  const header = extractBlock(mobile, ".site-header");
  const rows = gridRows(header);

  assert.deepEqual(rows, [
    ["brand", "toggle"],
    ["actions", "actions"],
    ["search", "search"],
  ]);
});

test("mobile compact header omits absent search and action rows", () => {
  const mobile = extractBlock(css, "@media (max-width: 760px)");

  assert.deepEqual(gridRows(extractBlock(mobile, ".site-header--compact")), [
    ["brand", "toggle"],
    ["actions", "actions"],
  ]);

  assert.deepEqual(
    gridRows(
      extractBlock(mobile, ".site-header--compact.site-header--no-actions"),
    ),
    [["brand", "toggle"]],
  );
});

test("mobile nav receives a full-width row only while open", () => {
  const mobile = extractBlock(css, "@media (max-width: 760px)");

  assert.deepEqual(
    gridRows(extractBlock(mobile, ".site-header.has-burger-nav.is-nav-open")),
    [
      ["brand", "toggle"],
      ["actions", "actions"],
      ["search", "search"],
      ["nav", "nav"],
    ],
  );
});

function gridRows(rule) {
  const areas = rule.match(/grid-template-areas:\s*([^;]+);/)?.[1] ?? "";
  return [...areas.matchAll(/"([^"]+)"/g)].map((match) =>
    match[1].trim().split(/\s+/),
  );
}
