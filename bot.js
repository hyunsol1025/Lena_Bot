require("./-Dev/env.js");

const os = require("os");
const fs = require('fs');

const v = require("./Variables.js");
const func = require("./Functions.js");
const timelineManager = require("./TIMELINE/TimeLineManager.js");

//
// TODO -->  디스코드 변수를 Variables.js로 옮겼음! 그래서 작성할때 client가 아니라 v.client로 쓰면됨!  <--
//

// 봇을 호스트하는 컴퓨터가 호스팅 서비스가 아님을 인식 -> 봇이 점검중이거나 개발중임
if(os.hostname().length < 20) {
    v.isNotHosting = true;
}

//////////////////////////////////////////////////// - 대화 기능 관련
frn = "레블아 ";
ansur = [];
saymst = [];
annom = [];
psay = -1;
namep = "";

f = fs.readFileSync("./lists/say.txt", "utf-8");
saymst = f.split("\n");

//////////////////////////////////////////////////// - 시간표 기능 관련
var d = func.getKTC();

d.setDate(2021, 4, 27); // TODO <-- 얘 없애기

timelineManager._TIMELINE_TIMETABLE_SET(d.getDay(), 7, 45, 4);
timelineManager._SET_TODAYTIMETABLE(d.getDay());

function _callTimeLineProcess() { timelineManager._TIMELINE_LOOP_PROCESS(); }

setInterval(_callTimeLineProcess, 2000);

////////////////////////////////////////////////////

v.client.on('ready', () => {
    console.log("레나봇 온라인!");

    // 봇을 호스팅 서비스로 호스트하지 않을때 점검중임을 표시
    if(v.isNotHosting) v.client.user.setActivity("점검!",{ type: 'PLAYING'});

});

v.client.on('message', message => {
    namep = message.author.username;
    //console.log(namep);

    // 대화관련
    for (var i = 0; i < saymst.length; i++) {
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
            f = saymst[annom[ran]];
            ansur = f.split(";");
            if (ansur[2] !== "admin" && ansur[2] !== "adminD") {
                const embed = new v.Discord.MessageEmbed()
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
        psay = -1;
    }
    //console.log(message.content.substr(7, message.content.length) + ";" + namep);
    if(message.content.startsWith(frn + "배워 "))
    {
        saymst.push(message.content.substr(7, message.content.length) + ";" + namep);
        f = message.content.substr(7, message.content.length).split(";");
        message.channel.send("\'" + f[0] + "\'은(는) " + "\'" + f[1] + "\'" + "이군요?  알겠어요 " + "\'" + namep + "\'" + "님!");
        fs.writeFileSync("./lists/say.txt",saymst.join('\n') , "utf-8");
        //가르치기 파일 세이브
    }

    if(message.content.startsWith(frn + "잊어 "))
    {
        for (var i = 0; i < saymst.length; i++) {
            f = saymst[i];
            ansur = f.split(";");
            if((ansur[2] != "admin") && (ansur[2] != "adminD") && (namep == ansur[2]) && (message.content.substr(7, message.content.length) == ansur[0]))
            {
                annom.push(i);
            }
        }
        if(annom.length != 0) {
            f = saymst[annom[annom.length - 1]];
            ansur = f.split(";");
            f = saymst.splice(annom[annom.length - 1], annom[annom.length - 1]);
            message.channel.send("\'" + ansur[0] + "\'" + "... 그게 뭐더라?");
            fs.writeFileSync("./lists/say.txt", saymst.join('\n'), "utf-8");
        }
        else
        {
            message.channel.send("자신이 가르친 단어만 잊게 할 수 있어요!");
        }
        annom = [];
    }


    // 시간표 관련

});

v.client.login(process.env.TOKEN);