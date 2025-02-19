import type {
	AnySelectMenuInteraction,
	ButtonInteraction,
	Client,
	ColorResolvable,
	GuildMemberRoleManager,
	Interaction,
	StringSelectMenuInteraction,
	UserSelectMenuInteraction,
} from "discord.js";
import { EmbedBuilder, MessageFlags } from "discord.js";
import * as jsonConfig from "../../../config.json";
export default async (
	interaction: StringSelectMenuInteraction,
	client: Client
) => {
	try {
		if (!interaction.isAnySelectMenu()) return;
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });
		// if (!interaction.isButton() || !interaction.guild) return;
		if (!interaction.values[0].startsWith("role."))
			return interaction.followUp({
				flags: "Ephemeral",
				content: "Invalid role. Try again later!",
			});
		const roleid: string = interaction.values[0].slice(5);
		const role =
			interaction.guild?.roles.cache.get(`${roleid}`) ||
			(await interaction.guild?.roles.fetch(`${roleid}`)) ||
			null;
		// if()
		if (!role) return;
		if (interaction.member && "roles" in interaction.member) {
			const memberRoles = interaction.member
				.roles as GuildMemberRoleManager;

			if (memberRoles.cache.has(role.id)) {
				await memberRoles.remove(role);
				await interaction.followUp(
					"Role has been removed from your user!"
				);
			} else {
				await memberRoles.add(role);
				await interaction.followUp("Role has been added to your user!");
			}
		}
	} catch (error) {
		console.log(error);
		await interaction.followUp("Something went wrong. Try again later!");
	}
};
