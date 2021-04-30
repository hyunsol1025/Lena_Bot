require("./-Dev/env.js");

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

frn = "레블아 ";
ansur = [];
saymst = [];
annom = [];
psay = -1;

f = fs.readFileSync("./lists/say.txt", "utf-8");
saymst = f.split("\n");

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.login(process.env.TOKEN);

client.on('message', message => {

    for (var i = 0; i < saymst.length; i++) {
        ansur = [];
        f = saymst[i];
        ansur = f.split(";");
        if (message.content == frn + ansur[0]) {
            annom.push(i);
            psay = message.content.startsWith(ansur[0]);
        }
    }

    if (i == saymst.length) {
        if (psay >= 0) {
            ran = rand(0, annom.length - 1);
            ansur = [];
            f = saymst[annom[ran]];
            ansur = f.split(";");
            if (ansur[2] !== "admin" && ansur[2] !== "adminD") {
                const embed = new Discord.MessageEmbed()
                    .setTitle('')
                    .setDescription(ansur[2] + '님이 가르쳐 주셨어요!')
                    .setColor('0xEDD903')
                message.channel.send(ansur[1] + "\n```\'" + ansur[2] + '\'님이 가르쳐 주셨어요!```');
            }
            else if (ansur[2] == "adminD") {
                message.channel.send(ansur[1]).then((msg) => {
                    setTimeout(function () {
                        msg.edit('***넹?***');
                    }, 1000);
                });
            }
            else {
                message.channel.send(ansur[1]);
            }

            psay = -1;
        }
        else if (message.content.startsWith(frn)) {
            if (!message.content.startsWith(frn + "배워 ") && !message.content.startsWith(frn + "잊어 ") && !message.content.startsWith(frn + "DEL ")) {
                message.channel.send("그런 단어는 몰라요..; >△<");
            }
        }
        annom = [];
        ansur = [];
        psay = -1;
    }
})