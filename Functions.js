module.exports = {
    // 한국시간 변수를 반환하는 메소드
    getKTC: function getKTC() {
        const curr = new Date();

        const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

        return new Date(utc + KR_TIME_DIFF);
    },

    // 매개변수로 받은 Date형식와 똑같은 날짜를 담은 Date형식의 인스턴스 생성, 변수를 반환하는 메소드
    getCloneDate: function getCloneDate(targetDate) {
        var _result = new Date();
        _result.setDate(targetDate.getDate());

        return _result;
    },

    rand: function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}