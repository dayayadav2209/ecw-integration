const express = require("express");
const fs = require("fs");
const path = require("path");

const CONFIG = JSON.parse(
  fs.readFileSync(path.join(__dirname, "oauth.config.json"), "utf8")
);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/** Public OAuth settings for the browser (no secret). */
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, port: PORT });
});

app.get("/api/oauth/config", (_req, res) => {
  res.json({
    authorizeEndpoint: CONFIG.authorizeEndpoint,
    clientId: CONFIG.clientId,
    redirectUri: CONFIG.redirectUri,
    practiceCode: CONFIG.practiceCode,
    audience: CONFIG.audience,
    scope: CONFIG.scope
  });
});

/** Exchange authorization code for access token (server-side, Basic Auth). */
app.post("/api/oauth/token", async (req, res) => {
  const { code, code_verifier, redirect_uri } = req.body || {};

  if (!code || !code_verifier) {
    return res.status(400).json({
      error: "invalid_request",
      error_description: "code and code_verifier are required"
    });
  }

  const redirectUri = redirect_uri || CONFIG.redirectUri;
  if (redirectUri !== CONFIG.redirectUri) {
    return res.status(400).json({
      error: "invalid_request",
      error_description: "redirect_uri does not match server configuration"
    });
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    code_verifier
  });

  const tokenUrl =
    CONFIG.tokenEndpoint + "?aud=" + encodeURIComponent(CONFIG.audience);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json"
  };

  if (CONFIG.tokenClientAuth === "basic") {
    const credentials = Buffer.from(
      `${CONFIG.clientId}:${CONFIG.clientSecret}`
    ).toString("base64");
    headers.Authorization = `Basic ${credentials}`;
  } else {
    body.set("client_id", CONFIG.clientId);
    body.set("client_secret", CONFIG.clientSecret);
  }

  try {
    const ecwResponse = await fetch(tokenUrl, {
      method: "POST",
      headers,
      body: body.toString()
    });

    const text = await ecwResponse.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    res.status(ecwResponse.status).json(data);
  } catch (err) {
    console.error("Token proxy error:", err);
    res.status(500).json({
      error: "server_error",
      error_description: err.message
    });
  }
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`ECW OAuth server running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT}/index.html`);
});
