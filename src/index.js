import * as dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
import Bot from "./bot.js";
import express from "express";
import path from "path";
import WebSocket from "ws";

const app = express();
const __dirname = path.resolve();
const host = process.env.JOYSTICKTV_HOST;
const clientId = process.env.JOYSTICKTV_CLIENT_ID;
const clientSecret = process.env.JOYSTICKTV_CLIENT_SECRET;
const wsHost = process.env.JOYSTICKTV_API_HOST;
const MAX_RECONNECT_ATTEMPTS = 3;
var reconnectAttempts = 0;

const connectToServer = function() {
  const accessToken = Buffer.from(clientId + ":" + clientSecret).toString("base64");
  const gatewayIdentifier = JSON.stringify({channel: "GatewayChannel"});
  const url = `${wsHost}?token=${accessToken}`;
  const ws = new WebSocket(url, ["actioncable-v1-json"]);

  ws.on("open", function open() {
    console.log("Connection has opened")
    const message = {
      command: "subscribe",
      identifier: gatewayIdentifier,
    };

    ws.send(JSON.stringify(message));
  });

  ws.on('error', console.error);

  ws.on('close', function close() {
    console.log('Connection has closed');

    // Reset the channels
    Bot.channels = [];
    setTimeout(()=> {
      console.log('Attempting reconnect')
      if (reconnectAttempts <= MAX_RECONNECT_ATTEMPTS) {
        reconnectAttempts++;
        connectToServer();
      }
    }, 30000);
  });

  let connected = false;

  ws.on("message", function message(data) {
    const receivedMessage = JSON.parse(data);

    switch (receivedMessage.type) {
      case "reject_subscription":
        console.log("subscription to socket was rejected");
        break;
      case "confirm_subscription":
        connected = true
        break;
    }

    if (connected) {
      Bot.handleMessage(ws, receivedMessage);
    }
  });
}

connectToServer();

function pagePath(file) {
  return path.join(`${__dirname}/pages/${file}`)
}

app.get('/', (_req, res) => {
  res.sendFile(pagePath('index.html'));
});

app.get('/terms', (_req, res) => {
  res.sendFile(pagePath('terms.html'));
});

app.get('/privacy', (_req, res) => {
  res.sendFile(pagePath('privacy.html'));
});

app.get('/install', (_req, res) => {
  const state = "JSTVchatterbot";
  const clientRequestParams = new URLSearchParams();
  clientRequestParams.append("client_id", clientId);
  clientRequestParams.append("scope", "bot");
  clientRequestParams.append("state", state);
  
  const authorizeUri = `${host}/api/oauth/authorize?${clientRequestParams.toString()}`;
  res.redirect(authorizeUri);
});

app.get('/callback', async (req, res) => {
  const clientRequestParams = new URLSearchParams();
  clientRequestParams.append("redirect_uri", "/unused");
  clientRequestParams.append("code", req.query.code);
  clientRequestParams.append("grant_type", "authorization_code");

  const response = await fetch(`${host}/api/oauth/token?${clientRequestParams.toString()}`, {
    method: "POST",
    headers: {
      "Authorization": "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      "Content-Type": "application/json",
    },
    body: "",
  });

  const data = await response.json();
  // storeTokenInformation(data.access_token).then()

  res.sendFile(pagePath('activated.html'));
});


console.log("listening: http://localhost:8080");
app.listen(8080);
