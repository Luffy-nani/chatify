const dotenv=require(`dotenv`);
dotenv.config();
const arcjet = require("@arcjet/node");
const { shield, detectBot, slidingWindow } = require("@arcjet/node");

const aj = arcjet.default({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
      ],
    }),
    slidingWindow({
      mode: "LIVE",
      max: 100,
      interval: 60,
    }),
  ],
});

module.exports = aj;