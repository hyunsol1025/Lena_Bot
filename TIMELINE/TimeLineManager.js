//
// 시간표 관리자

require("../-Dev/env.js");
var func = require("../Functions.js");

var TIMELINE_TIMENOTI_lEFTTIME = [ 0, 5, 10 ]; // 다음 수업을 알릴때, 해당 알림을 한 시점이 수업으로 부터 몇분 전 시각에 알림하는 가
var _ANTI_NOTI = ""; // 알림 도배 방지

var TIMELINE_TIMETABLE = [];

var TIMELINE = {
    d1: ["music","html","html","html","myTeacher","science","korea"],

    d2: ["korea","social","pro","pro","art","art","art"],

    d3: ["html","html","korea","pe","english","art","math"],

    d4: ["social","pe","math","science","korea","music","dream"],

    d5: ["free","english","pro","math","other","other"]
};

function getSubjectByTime(dayIndex, h, m) {
    var _todayTimeline = [];
    var _loop_index = 0;

    switch (dayIndex) {
        case 1:
            _todayTimeline = TIMELINE.d1;
            break;

        case 2:
            _todayTimeline = TIMELINE.d2;
            break;

        case 3:
            _todayTimeline = TIMELINE.d3;
            break;

        case 4:
            _todayTimeline = TIMELINE.d4;
            break;

        case 5:
            _todayTimeline = TIMELINE.d5;
            break;
    }

    TIMELINE_TIMETABLE.forEach(ele => {
        var str = ele.split("@")[0];
        var _d = func.getKTC();
        _d.setHours( parseInt(str.split(":")[0]) ); _d.setMinutes( parseInt(str.split(":")[1]) );

        TIMELINE_TIMENOTI_lEFTTIME.forEach(leftMin => {
            var _d2 = func.getKTC();
            _d2.setHours(h); _d2.setMinutes(m);

            _d2.setMinutes(_d2.getMinutes()+leftMin);

            if(_d2.getMinutes() == _d.getMinutes() && _d2.getMinutes() == _d.getMinutes()) {
                if(ele.includes("@lunch")) {
                    return "lunch";
                }
                else if(ele.includes("@finish")) {
                    return "finish";
                } else {
                    return _todayTimeline[_loop_index];
                }
            }
        });

        _loop_index++;
    });
}

module.exports = {

    _TIMELINE_LOOP_PROCESS: function _TIMELINE_PROCESS() {
        var d = func.getKTC();

        if(d.getDay() == 0 || d.getDay() == 6) return;

        getSubjectByTime(d);
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