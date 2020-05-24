const { Command } = require("klasa");
const cube = require("scrambler-util");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "fg",
            runIn: ["text"],
            cooldown: 5,
            aliases: ["guildford", "g"],
            usage: "",
            usageDelim: " ",
            description: "Generates one scramble for each puzzle in the Guildford challenge.",
            extendedHelp: "https://docs.scramblr.app/docs/scramblers/puzzles"
        });
    }

    async run(message, [...params]) {
        await message.send("Loading scrambles, please wait.");
        let types = ["222", "333", "444", "555", "666", "777"];
        let scrambles = types.map(type => cube(type)[0]);
        let scrambleStr = "";
        for (let i = 0; i < scrambles.length; i++)
            scrambleStr += `**${i + 2}x${i + 2}**: ${scrambles[i]}\n\n`;
        types = [
            { name: "**OH**: ", type: "333" },
            { name: "**Clock**: ", type: "clock" },
            { name: "**Megaminx**: ", type: "mega" },
            { name: "**Pyraminx**: ", type: "pyra" },
            { name: "**Skewb**: ", type: "skewb" },
            { name: "**Feet**: ", type: "333" }];
        scrambles = types.map(type => `${type.name}${cube(type.type)[0]}`);
        scrambles.forEach(scramble => scrambleStr += `${scramble}\n\n`);
        return message.send(scrambleStr);
    }
};
