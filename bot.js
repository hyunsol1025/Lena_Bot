require("./-Dev/env.js");

const os = require("os");
const v = require("./Variables.js");

// 봇을 호스트하는 컴퓨터가 호스팅 서비스가 아님을 인식 -> 봇이 점검중이거나 개발중임
if(os.hostname().length < 20) {
    v.isNotHosting = true;
}

const func = require("./Functions.js");
const timelineManager = require("./TIMELINE/TimeLineManager.js");

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

//////////////////////////////////////////////////// - 대화 기능 관련
frn = "레블아 ";
ansur = [];
saymst = [];
annom = [];
psay = -1;

f = fs.readFileSync("./lists/say.txt", "utf-8");
saymst = f.split("\n");

//////////////////////////////////////////////////// - 시간표 기능 관련
const timeline_noti_channel = client.channels.cache.get(process.env.timelineNotiChannel);
var d = func.getKTC();

timelineManager._TIMELINE_TIMETABLE_SET(d.getDay(), 7, 45, 4);
timelineManager._SET_TODAYTIMETABLE(d.getDay());

function _callTimeLineProcess() { timelineManager._TIMELINE_LOOP_PROCESS(); }

setInterval(_callTimeLineProcess, 2000);

////////////////////////////////////////////////////

client.on('ready', () => {
    console.log("레나봇 온라인!");

    // 봇을 호스팅 서비스로 호스트하지 않을때 점검중임을 표시
    if(v.isNotHosting) client.user.setActivity("점검!",{ type: 'PLAYING'});
});

client.on('message', message => {

    // 대화관련
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
            ran = func.rand(0, annom.length - 1);
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

    // 시간표 관련

});

client.login(process.env.TOKEN);