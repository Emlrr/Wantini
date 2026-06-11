const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!wanti")) {
    const prompt = message.content.replace("!wanti", "").trim();

    if (!prompt) return message.reply("Bir soru yaz 😄");

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );

      const text =
        res.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Cevap yok.";

      message.reply(text);
    } catch (err) {
      message.reply("Hata oluştu 😕");
    }
  }
});

client.login(DISCORD_TOKEN)
