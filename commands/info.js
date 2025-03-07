const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Get information about the bot and its source code."),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("Bot Information")
            .setDescription("Basic structure for Discord bot command-handler with slash command support.")
            .addFields(
                { name: "📌 Developer", value: "[wicksted](https://github.com/wicksted)", inline: true },
                { name: "📜 Source Code", value: "[GitHub Repository](https://github.com/wicksted)", inline: true },
                { 
                    name: "📦 Dependencies", 
                    value: "```ansi\n[2;37mdiscord.js[0m   | [2;37mdotenv[0m\n[2;37mfs[0m           | [2;37mpath[0m```", 
                    inline: false 
                }
            )
            .setFooter({ text: "Powered by Discord.js v14", iconURL: "https://i.imgur.com/AfFp7pu.png" })
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
};