const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const DISCORD_TOKEN = process.env.MTUxNDU3NzU1MTk5NjIyNzY1NA.Gi70ww.TXe6oihb2IqBGMlVI6Bux2fED4K5fKhA1Vx5sU;
const GEMINI_API_KEY = process.env.AQ.Ab8RN6K_rulWWNbtMZQQrLuvu84d8o_XOvvWo_LNgk4O7DCqvA;

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!wanti")) {
    const prompt = message.content.replace("!wanti", "").trim();

    if (!prompt) return message.reply("Bir soru yaz 😄");

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${AQ.Ab8RN6K_rulWWNbtMZQQrLuvu84d8o_XOvvWo_LNgk4O7DCqvA}`,
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

client.login(MTUxNDU3NzU1MTk5NjIyNzY1NA.Gi70ww.TXe6oihb2IqBGMlVI6Bux2fED4K5fKhA1Vx5sU)
