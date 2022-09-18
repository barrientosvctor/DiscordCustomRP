const DiscordRPC = require("discord-rpc");
const fs = require("fs");

const rpc = new DiscordRPC.Client({ transport: "ipc" });

console.log("Verifying configuration...");

if (!fs.existsSync("./config.json")) {
    const data = `{\n"textConfiguration": {\n"details": "Hello everyone",\n"state": "This is DiscordCustomRP"\n},\n"imageConfiguration": {\n"largeKey": "discord_logo",\n"largeText": "Discord Logo (large text)",\n"smallKey": "discord_black",\n"smallText": "Discord Black Logo (small text)"\n},\n\n"applicationID": "463437134137655298"\n}`.toString();
    console.error("Configutarion Error!");
    console.error("It is not possible to obtain information with the file \"config.json\". This is because the file does not exist.");
    console.warn(`We have recreated the "config.json" file with the default data, restart DiscordCustomRP to confirm that you will use these fields. You can modify them later!`);

    fs.writeFileSync("config.json", data);
    process.exit();
}

const config = require("../config.json");

console.log("Verification configuration successfully completed!");
console.log("Connecting RPC...");

DiscordRPC.register(config.applicationID);

const setActivity = () => {
    if (!rpc) {
	console.log("RPC no found.");
	process.exit();
    }

    rpc.setActivity({
	details: config.textConfiguration.details,
	state: config.textConfiguration.state,
	startTimestamp: Date.now(),
	largeImageKey: config.imageConfiguration.largeKey,
	largeImageText: config.imageConfiguration.largeText,
	smallImageKey: config.imageConfiguration.smallKey,
	smallImageText: config.imageConfiguration.smallText,
	instance: false,
	buttons: [
	    {
		label: "Button 1",
		url: "https://google.com/"
	    },
	    {
		label: "Button 2",
		url: "https://google.com/"
	    }
	]
    });
}

rpc.on("ready", async () => {
    setActivity();
    console.log("RPC successfully connected!");
});

rpc.login({ clientId: config.applicationID }).catch(err => console.error(err));
