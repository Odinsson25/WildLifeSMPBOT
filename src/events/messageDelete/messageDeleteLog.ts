import type {
	Message,
	Client,
	GuildMember,
	ColorResolvable,
	TextChannel,
} from "discord.js";
import type { CommandKit } from "commandkit";
import { EmbedBuilder } from "discord.js";
import * as jsonConfig from "../../../config.json";
export default async function (
	message: Message,
	client: Client<true>,
	handler: CommandKit
) {
	const embed = new EmbedBuilder()
		.setColor(jsonConfig.colors.alert as ColorResolvable)
		.setTitle("Message updated")
		.setThumbnail(
			message.author.avatarURL() || message.author.displayAvatarURL()
		)
		.setFields(
			{
				name: "Username",
				value: `${message.author.username || "N/A"}`,
				inline: true,
			},

			{
				name: "Account ID",
				value: `${message.author.id}`,
				inline: true,
			},
			{
				name: "Message content",
				value: `${message.content}`,
				inline: false,
			},
			{
				name: "Channel",
				value: `${message.channel}`,
				inline: true,
			},

			{
				name: "Flags",
				value: `${message.flags.toArray().join(", ") || "None"}`,
				inline: true,
			},
			{
				name: "Message link",
				value: `https://discord.com/channels/${message.guild?.id}/${message.channel.id}/${message.id}`,
				inline: true,
			}
		)
		.setTimestamp();

	(
		(message.guild?.channels.cache.get(
			jsonConfig.channels.logs.message
		) as TextChannel) ||
		((await message.guild?.channels.fetch(
			jsonConfig.channels.logs.message
		)) as TextChannel)
	)?.send({ embeds: [embed] });
}
