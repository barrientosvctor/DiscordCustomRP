const DiscordRPC = require("discord-rpc");
const fs = require("fs");

console.log("Verifying configuration...");

if (!fs.existsSync("./config.json")) {
    const data = `{\n"textConfiguration": {\n"details": "Hello everyone",\n"state": "This is DiscordCustomRP"\n},\n"imageConfiguration": {\n"largeKey": "discord_logo",\n"largeText": "Discord Logo (large text)",\n"smallKey": "discord_black",\n"smallText": "Discord Black Logo (small text)"\n},\n"buttons": {\n"firstButton": {\n"label": "Button 1",\n"url": "https://google.com"\n},\n"secondButton": {\n"label": "Button 2",\n"url": "https://google.com"\n}\n},\n\n"applicationID": "463437134137655298"\n}`.toString();
    console.error("\x1b[31m", "Configutarion Error!");
    console.error("\x1b[31m", "It is not possible to obtain information with the file \"config.json\". This is because the file does not exist.");
    console.warn("\x1b[33m", `We have recreated the "config.json" file with the default data, restart DiscordCustomRP to confirm that you will use these fields. You can modify them later!`);

    fs.writeFileSync("config.json", data);
    process.exit();
}

const config = require("../config.json");

console.log("\x1b[32m", "Verification configuration successfully completed!");
console.log("Connecting RPC...");

const rpc = new DiscordRPC.Client({ transport: "ipc" });
DiscordRPC.register(config.applicationID);

async function setActivity() {
    if (!rpc) {
        console.error("\x1b[31m", "RPC no found.");
        process.exit();
    }

    await rpc.setActivity({
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
                label: config.buttons.firstButton.label,
                url: config.buttons.firstButton.url
            },
            {
                label: config.buttons.secondButton.label,
                url: config.buttons.secondButton.url
            }
        ]
    });
}

(async () => {
    rpc.on("ready", async () => {
        await setActivity();
        console.log("\x1b[32m", "RPC successfully connected!");
    });

    await rpc.login({ clientId: config.applicationID }).catch(err => console.error(err));
})();
