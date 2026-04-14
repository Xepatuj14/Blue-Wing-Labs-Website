import http from "node:http";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = Number(process.env.ACCESS_API_PORT || 8787);
const dataDirectory = path.join(__dirname, "data");
const submissionsFile = path.join(dataDirectory, "access-requests.ndjson");

function json(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  response.end(JSON.stringify(payload));
}

function normalizeField(value, maxLength) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

async function persistSubmission(payload) {
  await mkdir(dataDirectory, { recursive: true });
  await appendFile(submissionsFile, `${JSON.stringify(payload)}\n`, "utf8");
}

const server = http.createServer(async (request, response) => {
  if (!request.url) {
    json(response, 400, { error: "Invalid request" });
    return;
  }

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    response.end();
    return;
  }

  if (request.method === "GET" && request.url === "/api/health") {
    json(response, 200, { ok: true });
    return;
  }

  if (request.method === "POST" && request.url === "/api/access-request") {
    let rawBody = "";

    request.on("data", (chunk) => {
      rawBody += chunk;

      if (rawBody.length > 1_000_000) {
        request.destroy();
      }
    });

    request.on("end", async () => {
      try {
        const body = JSON.parse(rawBody || "{}");
        const submission = {
          submittedAt: new Date().toISOString(),
          name: normalizeField(body.name, 120),
          email: normalizeField(body.email, 160).toLowerCase(),
          focus: normalizeField(body.focus, 80) || "Early access",
          note: normalizeField(body.note, 1200),
          source: "blue-wing-labs-website",
        };

        if (!submission.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
          json(response, 400, { error: "A valid email address is required." });
          return;
        }

        await persistSubmission(submission);
        json(response, 201, { ok: true });
      } catch (error) {
        json(response, 500, {
          error: "Unable to save the request right now.",
          detail: error instanceof Error ? error.message : "Unknown error",
        });
      }
    });

    request.on("error", () => {
      json(response, 500, { error: "Unable to read the request body." });
    });

    return;
  }

  json(response, 404, { error: "Not found" });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Blue Wing Labs access API listening on http://127.0.0.1:${port}`);
});
