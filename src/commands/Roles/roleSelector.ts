import type {
	CommandData,
	SlashCommandProps,
	CommandOptions,
} from "commandkit";
import {
	ActionRowBuilder,
	APIRole,
	ApplicationCommandOptionType,
	ChannelType,
	EmbedBuilder,
	MessageFlags,
	PermissionFlagsBits,
	Role,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	TextChannel,
} from "discord.js";

export const data: CommandData = {
	name: "roleselector",
	description: "Create a role selction menu",
	options: [
		{
			name: "role1",
			description: "Select a role",
			type: ApplicationCommandOptionType.Role,
			required: true,
		},
		{
			name: "channel",
			description: "Select a channel",
			type: ApplicationCommandOptionType.Channel,
			channel_types: [ChannelType.GuildText],
		},

		{
			name: "role2",
			description: "Select a role",
			type: ApplicationCommandOptionType.Role,
		},
		{
			name: "role3",
			description: "Select a role",
			type: ApplicationCommandOptionType.Role,
		},
		{
			name: "role4",
			description: "Select a role",
			type: ApplicationCommandOptionType.Role,
		},
		{
			name: "role5",
			description: "Select a role",
			type: ApplicationCommandOptionType.Role,
		},
	],
};

export const run = async ({
	interaction,
	handler,
	client,
}: SlashCommandProps) => {
	await interaction.deferReply({ flags: MessageFlags.Ephemeral });
	const r = [
		interaction.options.getRole("role1"),
		interaction.options.getRole("role2"),
		interaction.options.getRole("role3"),
		interaction.options.getRole("role4"),
		interaction.options.getRole("role5"),
	];
	const roles: (Role | APIRole | null)[] = [];

	for (let index = 0; index < r.length; index++) {
		if (r[index] || r[index] !== null) {
			roles.push(r[index]);
		}
	}

	const aRow = new ActionRowBuilder<StringSelectMenuBuilder>();
	const selectMenu = new StringSelectMenuBuilder()
		.setCustomId("starter")
		.setPlaceholder("Make a selection!");
	roles.forEach((R) => {
		if (R === null || R == null) return;
		// console.log(R);
		selectMenu.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel(`${R?.name}`)
				.setDescription(`Get the ${R?.name} role`)
				.setValue(`role.${R?.id}`)
		);
	});
	aRow.addComponents(selectMenu);
	const channel: TextChannel =
		(interaction.options.getChannel("channel") as TextChannel) ||
		(interaction.channel as TextChannel);
	const embed = new EmbedBuilder({
		title: "<:WildLandsMc:1341167455997001758> Select your roles",
		description:
			"Select which roles you would like to be tagged in! 🔔 Different announcements will ping different roles, so choose the ones that match your interests. This way, you'll only get notified about the updates that matter to you! 😊",
		color: 0x009600,
	});
	// console.log(selectMenu.options);
	channel.send({ embeds: [embed], components: [aRow] });
};

export const options: CommandOptions = {
	userPermissions: ["ManageRoles"],
};
