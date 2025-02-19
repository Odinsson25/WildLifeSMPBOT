import "dotenv/config";
import * as mongoose from "mongoose";
import { Client, IntentsBitField } from "discord.js";
import { CommandKit } from "commandkit";

import * as jsonConfig from "../config.json";

import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
		IntentsBitField.Flags.GuildPresences,
	],
});

new CommandKit({
	client,
	eventsPath: join(__dirname, "events"),
	commandsPath: join(__dirname, "commands"),
	devGuildIds: [jsonConfig.testServer], // + support server
	devUserIds: jsonConfig.devs as string[],
	devRoleIds: [jsonConfig.roles.dev],
});
process.on("unhandledRejection", (reason, promise) => {
	console.log("Unhandled Rejection Error");
	console.log(reason, promise);
}); // Handles Unhandled Rejection Errors

process.on("uncaughtException", (err, origin) => {
	console.log("Uncaught Exeception Error");
	console.log(err, origin);
}); // Handles Uncaught Excpetion Errors
(async () => {
	try {
		console.log("🔁 Connecting to database...");
		mongoose.set("strictQuery", false);
		await mongoose
			.connect(process.env.MONGO_URI as string)
			.then(() => console.log("✅ Connected to database."));
	} catch (error) {
		console.log("❌ Connection to database failed!");
		console.log(error);
	}
})();

client.login(process.env.TOKEN);
