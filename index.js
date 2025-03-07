require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.commands = new Collection();
const commands = [];
const commandsPath = path.join(__dirname, "commands");

// Load all command files dynamically
fs.readdirSync(commandsPath).forEach(file => {
  if (!file.endsWith(".js")) return;
  
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
});

console.log(`✅ Loaded ${client.commands.size} command(s)!`); // Added this line

client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  // Slash commands register
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  try {
    console.log("⌛ Registering slash commands...");
    await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
    console.log("✅ Slash commands registered successfully!");
  } catch (error) {
    console.error("❌ Failed to register commands:", error);
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "An error occurred while executing this command!", ephemeral: true });
  }
});

client.login(process.env.TOKEN);