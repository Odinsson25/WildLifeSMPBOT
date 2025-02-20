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
	oldMessage: Message,
	newMessage: Message,
	client: Client<true>,
	handler: CommandKit
) {
	if (oldMessage.content == newMessage.content) return;
	const embed = new EmbedBuilder()
		.setColor(jsonConfig.colors.alert as ColorResolvable)
		.setTitle("Message updated")
		.setThumbnail(
			oldMessage.author.avatarURL() ||
				oldMessage.author.displayAvatarURL()
		)
		.setFields(
			{
				name: "Username",
				value: `${oldMessage.author.username || "N/A"}`,
				inline: true,
			},

			{
				name: "Account ID",
				value: `${oldMessage.author.id}`,
				inline: true,
			},
			{
				name: "Old Message",
				value: `${oldMessage.content}`,
				inline: false,
			},
			{
				name: "New Message",
				value: `${newMessage.content}`,
				inline: false,
			},

			{
				name: "Flags",
				value: `${newMessage.flags.toArray().join(", ") || "None"}`,
				inline: true,
			},
			{
				name: "Message link",
				value: `https://discord.com/channels/${newMessage.guild?.id}/${newMessage.channel.id}/${newMessage.id}`,
				inline: true,
			}
		)
		.setTimestamp();

	(
		(newMessage.guild?.channels.cache.get(
			jsonConfig.channels.logs.message
		) as TextChannel) ||
		((await newMessage.guild?.channels.fetch(
			jsonConfig.channels.logs.message
		)) as TextChannel)
	)?.send({ embeds: [embed] });
}
