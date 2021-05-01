//
// 시간표 관리자

require("../-Dev/env.js");

const wataten = require("./AboutWataten");
const func = require("../Functions.js");
const v = require("../Variables.js");

/////////////////////////

var TIMELINE_TIMENOTI_lEFTTIME = [ 0, 5, 10 ]; // 다음 수업을 알릴때, 해당 알림을 한 시점이 수업으로 부터 몇분 전 시각에 알림하는 가

var _ANTI_ACT = ""; // 특정 시각에 대한 프로세스 차단

var TIMELINE_TIMETABLE = [];

var TIMELINE = {
    d1: ["music","html","html","html","myTeacher","science","korea"],

    d2: ["korea","social","pro","pro","art","art","art"],

    d3: ["html","html","korea","pe","english","art","math"],

    d4: ["social","pe","math","science","korea","music","dream"],

    d5: ["free","english","pro","math","other","other"]
};

/////////////////////////

// 시간에 따라 과목을 반환하는 메소드
function getSubjectByTime(dayIndex, h, m) {
    console.log("-----");

    for(var i = 0; i < TIMELINE_TIMETABLE.length; i++) {
        var ele = TIMELINE_TIMETABLE[i];
        var totalEle = ele.split("@")[0];

        for (var j = 0; j < TIMELINE_TIMENOTI_lEFTTIME.length; j++) {
            var _d2 = func.getKTC();

            var leftMin = TIMELINE_TIMENOTI_lEFTTIME[j];

            _d2.setHours(h);
            _d2.setMinutes(m);
            _d2.setMinutes(_d2.getMinutes() + leftMin);

            // console.log("["+leftMin+"분 후] "+_d2.getHours()+"시 "+_d2.getMinutes()+"분 <-> "+ele);
            // console.log((_d2.getHours()+":"+_d2.getMinutes())+" == "+totalEle);

            if ((_d2.getHours() + ":" + _d2.getMinutes()) == totalEle) {

                if (ele.includes("@lunch")) {

                    return leftMin + "@lunch";

                } else if (ele.includes("@finish")) {

                    return leftMin + "@finish";

                } else {
                    return leftMin + "@" + v.todayTimeline[i];
                }

            }

        }

    }

    return false;
}

// 과목의 한글 이름을 반환하는 메소드
function getSubjectKorName(subject) {
    switch (subject) {
        case "myTeacher": return "담임 선생님"
        case "english": return "영어"
        case "korea": return "국어"
        case "social": return "사회"
        case "science": return "과학"
        case "pro": return "프로그래밍"
        case "html": return "응용 프로그래밍"
        case "art": return "미술 & 컴퓨터 그래픽"
        case "pe": return "체육"
        case "music": return "음악"
        case "dream": return "진로"
        case "free": return "자율"
        default: return null
    }
}

function TIMELINE_NOTI(subject, leftMin) {
    console.log("[TIMELINE_NOTI] subject: "+subject+" | leftMin: "+leftMin);
    const timeline_noti_channel = v.client.channels.cache.get(process.env.timelineNotiChannel);

    var classLink = (subject === "pro" ? getClassURL("pro1") : getClassURL(subject));
    var _title = "여기를 눌러 "+getSubjectKorName(subject)+" 수업에 참여하자!";
    var _des_leftTime = "";
    var _des = "추가정보가 없음.";

    // 추가 정보 설정
    if(subject === "pro") {
        _des = "**[여기를 클릭]("+getClassURL("pro2")+")**하여 뒷 번호 프로그래밍에 참가할 수 있음.\n"
    }

    else if(subject == "music") {
        _des = "**[여기를 클릭]("+getClassURL("music_ebs")+")**하여 음악 EBS에 접속할 수 있음.\n"
    }

    // 남은시간 설정
    _des_leftTime += (leftMin == 0 ? "지금 수업이 시작됨!" : "수업까지 앞으로 **"+leftMin+"분 남음!**");

    // 로그
    console.log("\tclassLink -> "+classLink);

    // 수업 이름 한글화
    const embed = new v.Discord.MessageEmbed()
        .setTitle(_title)
        .setColor("#f5b042")
        .setURL(classLink)
        .setDescription("\n\u200b")
        .setThumbnail(wataten.getRandomWataten())
        .addField("💬 | 추가정보",_des)
        .addField("⏱ | 남은시간",_des_leftTime);
        //.setFooter(_des_leftTime,"https://i.postimg.cc/JnFDHgb5/time-xxl.png");

    try {
        timeline_noti_channel.send(embed);
    } catch (e) {
        console.log("[오류] 시간표 알림 메세지 전송에 실패했음!")
    }
}

// 과목 링크를 반환하는 메소드
function getClassURL(subject) {
    switch(subject) {
        case "free":
            return process.env.free+"";

        case "myTeacher":
            return process.env.myTeacher+"";

        case "english":
            return process.env.english+"";

        case "korea":
            return process.env.korea+"";

        case "social":
            return process.env.social+"";

        case "science":
            return process.env.science+"";

        case "pro1":
            return process.env.pro1+"";

        case "pro2":
            return process.env.pro2+"";
        case "html":
            return process.env.html+"";

        case "art":
            return process.env.art+"";

        case "pe":
            return process.env.pe+"";

        case "music":
            return process.env.music+"";

        case "music_ebs":
            return process.env.music_ebs+"";

        case "dream":
            return process.env.dream+"";

        default:
            return null;

    }
}

module.exports = {

    // 디버깅 출력
    getDebug: function getDebug() {
        console.log("\n[ TimeLineManager ] -----------\nTIMELINE_TIMENOTI_LEFTTIME: "+TIMELINE_TIMENOTI_lEFTTIME+"\n_ANTI_ACT: "+_ANTI_ACT+"\nTIMELINE_TIMETABLE: "+TIMELINE_TIMETABLE+"\n오늘의 시간표: "+v.todayTimeline);
    },

    // 오늘에 해당하는 시간표 배열을 설정하기
    _SET_TODAYTIMETABLE: function(dayIndex) {
        switch (dayIndex) {
            case 1:
                v.todayTimeline = TIMELINE.d1;
                break;

            case 2:
                v.todayTimeline = TIMELINE.d2;
                break;

            case 3:
                v.todayTimeline = TIMELINE.d3;
                break;

            case 4:
                v.todayTimeline = TIMELINE.d4;
                break;

            case 5:
                v.todayTimeline = TIMELINE.d5;
                break;
        }

        console.log("todayTimeLine 설정(dayIndex:"+dayIndex+"): "+v.todayTimeline);
    },

    // 주기적으로 실행되는 메소드
    _TIMELINE_LOOP_PROCESS: function _TIMELINE_LOOP_PROCESS() {
        var d = func.getKTC();

        if(_ANTI_ACT == d.getHours()+":"+d.getMinutes()) return; // <-- 이거는 테스트 전용 코드
        // if((d.getDay() == 0 || d.getDay() == 6) || _ANTI_ACT == d.getHours()+":"+d.getMinutes()) return;

        var subject = getSubjectByTime(d.getDay(), d.getHours(), d.getMinutes());

        if(subject !== false) {

            console.log("[과목발견] 다음수업("+subject.split("@")[1]+") 까지 "+subject.split("@")[0]+"분 남음!");
            TIMELINE_NOTI(subject.split("@")[1],subject.split("@")[0]);

        } else {

            console.log("과목 정보가 없음!");

        }

        _ANTI_ACT = d.getHours()+":"+d.getMinutes();
    },

    // 시간표의 시간 목록을 설정하는 메소드
    _TIMELINE_TIMETABLE_SET: function _TIMELINE_TIMETABLE_SET(dayIndex, classCount, classTime, nextIsLunch) {
        console.log("[ TIMETABLE 배열 구성 ] ##########################");
        console.log("오늘: "+dayIndex+" | 수업 수: "+classCount+" | 수업 시간: "+classTime+"분 | 다음이 점심시간인 교시: "+nextIsLunch+"교시\n");
        TIMELINE_TIMETABLE = [];

        var d = func.getKTC();
        d.setHours(8); d.setMinutes(30);

        for(var i = 0; i < classCount; i++) {
            var _addMin = 0;

            if(i != 0) {

                _addMin += classTime;

                // 다음교시가 점심시간임 -> 쉬는시간 없음
                if(i == nextIsLunch) {
                    d.setMinutes(d.getMinutes() + _addMin);
                    TIMELINE_TIMETABLE.push(d.getHours()+":"+d.getMinutes()+"@lunch");
                    d.setMinutes(d.getMinutes() + 80);

                    _addMin = 0;

                } else {

                    _addMin += 10;

                }
            }

            d.setMinutes(d.getMinutes() + _addMin);

            TIMELINE_TIMETABLE.push(d.getHours()+":"+d.getMinutes());
        }

        d.setMinutes(d.getMinutes() + 45);
        TIMELINE_TIMETABLE.push(d.getHours()+":"+d.getMinutes()+"@finish");


        // 디버깅 전용
        var debugMode = true;

        if(debugMode) {
            var ddd = func.getKTC();

            var debugTime = "14:"+(ddd.getMinutes()+0);
            console.log(debugTime);
            var _loop_index = 0;
            TIMELINE_TIMETABLE.forEach(ele => {

                if(ele.includes("@")) {
                    TIMELINE_TIMETABLE[_loop_index] = debugTime+"@"+ele.split("@")[1];
                } else {
                    TIMELINE_TIMETABLE[_loop_index] = debugTime;
                }

                _loop_index++;
            });
        }

        // 최종 TIMETABLE 배열 결과 출력
        var _class = 1;

        TIMELINE_TIMETABLE.forEach(ele => {
            if(ele.includes("lunch")) {
                console.log("점심시간 | "+ele.split("@")[0]);
            }

            else if(ele.includes("finish")) {
                console.log("종례 | "+ele.split("@")[0]);

            } else {
                console.log(_class++ +"교시 | "+ele);
            }
        });
        console.log("##########################");
    }
}