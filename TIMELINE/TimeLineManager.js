//
// 시간표 관리자

var func = require("../Functions.js");

var TIMELINE_TIMETABLE = [];

var TIMELINE = {
    d1: ["music","html","html","html","myTeacher","science","korea"],

    d2: ["korea","social","pro","pro","art","art","art"],

    d3: ["html","html","korea","pe","english","art","math"],

    d4: ["social","pe","math","science","korea","music","dream"],

    d5: ["free","english","pro","math","other","other"]
};

module.exports = {
    _TIMELINE_LOOP_PROCESS: function _TIMELINE_PROCESS() {

    },

    // 시간표의 시간 목록을 설정하는 메소드
    _TIMELINE_TIMETABLE_SET: function _TIMELINE_TIMETABLE_SET(dayIndex, classCount, classTime, nextIsLunch) {
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
    }
}