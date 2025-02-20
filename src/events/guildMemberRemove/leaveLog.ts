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
	member: GuildMember,
	client: Client<true>,
	handler: CommandKit
) {
	const embed = new EmbedBuilder()
		.setColor(jsonConfig.colors.grey.dark as ColorResolvable)
		.setTitle("Member left")
		.setThumbnail(member.avatarURL() || member.displayAvatarURL())
		.setFields(
			{
				name: "Username",
				value: `${member.user.username || "N/A"}`,
				inline: true,
			},
			{
				name: "Display name",
				value: `${member.displayName || "N/A"}`,
				inline: true,
			},
			{ name: "Account ID", value: `${member.id}`, inline: false },
			{
				name: "Account created on",
				value: `<t:${(member.user.createdTimestamp / 1000).toFixed(
					0
				)}:d>`,
				inline: false,
			},
			{
				name: "Joined on",
				value: `<t:${((member.joinedTimestamp || 0) / 1000).toFixed(
					0
				)}:d>`,
				inline: false,
			},

			{
				name: "Flags",
				value: `${member.flags.toArray().join(", ") || "None"}`,
				inline: false,
			}
		)
		.setTimestamp();
	(
		(member.guild.channels.cache.get(
			jsonConfig.channels.logs.join
		) as TextChannel) ||
		((await member.guild.channels.fetch(
			jsonConfig.channels.logs.join
		)) as TextChannel)
	)?.send({ embeds: [embed] });
}
