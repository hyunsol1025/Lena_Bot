require("./-Dev/env.js");

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

frn = "레블아 ";
ansur = [];
saymst = [];
annom = [];
saypl = [];
psay = -1;

f = fs.readFileSync("./lists/say.txt", "utf-8");
saymst = f.split("\n");

f = fs.readFileSync("./lists/saylist.txt", "utf-8");
ansur = f.split("\n");

f = fs.readFileSync("./lists/sayp.txt", "utf-8");
saypl = f.split("\n");

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.login(process.env.TOKEN);

client.on('message', message => {

    for (var i = 0; i < saymst.length; i++) {
        if (message.content == (frn + saymst[i])) {
            annom.push(i);
            psay = message.content.startsWith(saymst[i]);
        }
    }

    if (i == saymst.length) {
        if (psay >= 0) {
            ran = rand(0, annom.length - 1);
            if (saypl[annom[ran]] !== "admin" && saypl[annom[ran]] !== "adminD") {
                const embed = new Discord.MessageEmbed()
                    .setTitle('')
                    .setDescription(saypl[annom[ran]] + '님이 가르쳐 주셨어요!')
                    .setColor('0xEDD903')
                message.channel.send(ansur[annom[ran]] + "\n```\'" + saypl[annom[ran]] + '\'님이 가르쳐 주셨어요!```');
            } else if (saypl[ran] == "adminD") {
                //await asyncio.sleep(1.0)
                //await dco.edit(content='***넹?***')
            }
            else
                message.channel.send(ansur[annom[ran]]);

            psay = -1;
        }
        else if (message.content.startsWith(frn)) {
            if (!message.content.startsWith(frn + "배워 ") && !message.content.startsWith(frn + "잊어 ") && !message.content.startsWith(frn + "DEL ")) {
                message.channel.send("그런 단어는 몰라요..; >△<");
            }
        }
        annom = [];
    }
})