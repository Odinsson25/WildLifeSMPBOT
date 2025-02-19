import { ActivityType } from "discord.js";
import * as jsonConfig from "../../../config.json";

import type { Client } from "discord.js";
export default (client: Client<true>) => {
	let statusses = [
		{
			name: "Staff needed? Open a ticket, no DMs!",
			type: ActivityType.Custom,
		},
		{
			name: "Server online! Ready for adventure!",
			type: ActivityType.Custom,
		},
		{
			name: `Chat with us! Join ⁠💬・general `,
			type: ActivityType.Custom,
		},
		{
			name: "Read the rules! Respect & have fun!",
			type: ActivityType.Custom,
		},
		{
			name: "New here? Join the adventure! IP: OfficialWildlandsMC.aternos.me ",
			type: ActivityType.Custom,
		},
		];

	let statusCount = -1;
	setInterval(() => {
		statusCount++;
		if (statusCount === statusses.length) statusCount = 0;

		client.user?.setActivity(statusses[statusCount]);
	}, 5 * 1000);
};
