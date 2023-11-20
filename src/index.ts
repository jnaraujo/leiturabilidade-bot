import "dotenv/config";

import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import {
  calculateFleschReadingFromText,
  easeToLabel,
} from "./libs/ReadingEase";

const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.start(
  async (ctx) =>
    await ctx.reply(
      "Olá! Bem vindo ao bot do Teste de Leiturabilidade! Para começar, envie um texto para ser analisado.",
    ),
);

bot.on(message("text"), async (ctx) => {
  const text = ctx.message.text.trim();

  const result = calculateFleschReadingFromText(text);

  ctx.replyWithHTML(
    `O texto enviado tem <b>${result.words} palavra(s)</b> e <b>${
      result.sentences
    } frase(s)</b>. O resultado do teste é <b>${Math.round(
      result.result,
    )}%</b>, o que significa que o texto é adequado para <b>${easeToLabel(
      result.result,
    )}</b>.`,
  );
});

bot.launch();
