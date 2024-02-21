const axios = require("axios");

const config = {
  name: "ai",
  version: "1.0.0",
  hasPermission: 0,
  credits: "unknown",
  description: "OpenAI official AI with no prefix",
  commandCategory: "education",
  usePrefix: true,
  usages: "...",
  cooldowns: 0
};

const handleEvent = async function ({ api, event, client, __GLOBAL }) {

  if (event.body.indexOf("ai") === 0 || event.body.indexOf("Ai") === 0) {
    const { threadID, messageID } = event;
    const input = event.body;
    const message = input.split(" ");

    if (message.length < 2) {
      api.sendMessage("Please provide a question first.", event.threadID, event.messageID);
    } else {
      try {
        api.sendMessage('Please bear with me while I ponder your request...', event.threadID, event.messageID);
        const ris = await axios.get(`https://markapi-gpt4.cyclic.app/api/gpt4?query=${message.slice(1).join(" ")}`);
        const result = ris.data.Mark;
        const Mark = `𝗔𝗜 🚀:\n\n${result}`;
        api.sendMessage(Mark, event.threadID, event.messageID);
      } catch (err) {
        console.error(err);
        api.sendMessage("Opsss! nawala yung cignal, Please try again.", event.threadID, event.messageID);
      }
    }
  }
};

const run = function ({ api, event, client, __GLOBAL }) {
};

module.exports = { config, handleEvent, run };
