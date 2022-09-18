# DiscordCustomRP

![](https://i.imgur.com/JUsozWb.png)

## Pre-requisites
* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/) (Optional)

## Installation
* Click to the **Code** green button.
* Click on **Download ZIP** button.
* Unzip the zip file.
* In your Terminal, go to the DiscordCustomRP folder directory with `cd folder\directory`
* Type the `npm install` command

![](https://i.imgur.com/03m7X6b.png)
![](https://i.imgur.com/p3Nmf1m.png)

## Creating an application in Discord
* Go to the website: https://discord.com/developers/applications
* Then click on the "New Application" button.
* Give your application a name and then click on the "Create Application" button.
* Copy the Application ID.
* Go down and click on the "Rich Presence" button.

![](https://i.imgur.com/xcBRlmL.png)

* Upload the images that you will use in your Rich Presence, remember that all the images must have a recognizable name and then identify it in the configuration files of DiscordCustomRP, look carefully at which section you upload the images, if they are "Large" or "Small". In the screenshot we will upload a small image called `discord_black` and another large image called `discord_logo`
* Then click on "Save changes" and go to the [config.json](/config.json) file to start configuring your Rich Presence.

![](https://i.imgur.com/DPVyKiF.png)

## Starting to customize my Rich Presence

This is the final result of configuring my `config.json`. To get the `applicationID` you must go to your application on the Discord developer page and copy the field "Application ID".

```json
{
"textConfiguration": {
"details": "Hello everyone",
"state": "This is DiscordCustomRP"
},
"imageConfiguration": {
"largeKey": "discord_logo",
"largeText": "Discord Logo (large text)",
"smallKey": "discord_black",
"smallText": "Discord Black Logo (small text)"
},

"applicationID": "463437134137655298"
}
```

## Running the application
* To turn on the Rich Presence use the following command on your console: `node .` or `npm run start`

## Notes
* The names of the resources according to the put should be placed in the `smallKey` or `largeKey` fields, depending on the selected size given to the image.
* To edit the main text of your Rich Presence you must modify the `details` or `state` field, you can always modify the fields that are in quotes.
