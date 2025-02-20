// import { Client, GuildMember, EmbedBuilder, ColorResolvable } from "discord.js";
// import * as jsonConfig from "../../../config.json";
// /**
//  *
//  * @param {Client} client
//  * @param {GuildMember} member
//  */
// export default function (client: Client, member: GuildMember): void {
//   const joinEmbed = new EmbedBuilder()
//     .setAuthor({
//       name: member.user.username,
//       iconURL:
//         member.user.avatarURL() ||
//         member.user.defaultAvatarURL ||
//         member.user.displayAvatarURL(),
//       url: `https://discord.com/users/${member.user.id}/`,
//     })
//     .setTitle("Welkom in de server!")
//     .setColor((jsonConfig.colors.mainColor as ColorResolvable) || null)
//     .setThumbnail(member.user.avatarURL())

//     .setDescription(`Welkom ${member}!\nNeem een kijkje in de server!`)
//     .addFields(
//       {
//         name: "Regels",
//         value: `Lees onze regels door in <#${
//           member.guild.rulesChannel?.id || jsonConfig.channels.rules
//         }>`,
//         inline: true,
//       },
//       {
//         name: "Hulp nodig?",
//         value: `We zijn er voor je! Maak een ticket aan in <#${jsonConfig.channels.support}>`,
//         inline: true,
//       }
//     )

//     .setFooter({
//       text: ` ${member.guild.name.toString()}`,
//       iconURL: member.guild.iconURL() || "",
//     })
//     .setTimestamp();
//   member.guild.systemChannel?.send({ embeds: [joinEmbed] });
// }

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
	const joinEmbed = new EmbedBuilder()
		.setAuthor({
			name: member.user.username,
			iconURL:
				member.user.avatarURL() ||
				member.user.defaultAvatarURL ||
				member.user.displayAvatarURL(),
			url: `https://discord.com/users/${member.user.id}/`,
		})
		.setTitle("Welkom in de server!")
		.setColor((jsonConfig.colors.mainColor as ColorResolvable) || null)
		.setThumbnail(member.user.avatarURL())
		.setDescription(`Welkom ${member}!\nNeem een kijkje in de server!`)
		.addFields(
			{
				name: "Regels",
				value: `Lees onze regels door in <#${
					member.guild.rulesChannel?.id || jsonConfig.channels.rules
				}>`,
				inline: true,
			},
			{
				name: "Hulp nodig?",
				value: `We zijn er voor je! Maak een ticket aan in <#${jsonConfig.channels.support}>`,
				inline: true,
			}
		)
		.setFooter({
			text: ` ${member.guild.name.toString()}`,
			iconURL: member.guild.iconURL() || "",
		})
		.setTimestamp();

	(
		(member.guild.systemChannel ||
			member.guild.channels.cache.get(jsonConfig.channels.welcome) ||
			(await member.guild.channels.fetch(
				jsonConfig.channels.welcome
			))) as TextChannel
	)?.send({ embeds: [joinEmbed] });
}
