import { Telegraf } from 'telegraf';

const TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(TOKEN);

export const sendError = async (message, func, file) => {
	const text = message + " ( Function: " + func + " File: " + file + " )";
	const error = await bot.telegram.sendMessage(process.env.BOT_CHAT_ID, text);

	return error;
}

export const sendLog = async (message) => {
	const log = await bot.telegram.sendMessage(process.env.BOT_CHAT_ID, message);

	return log;
}
