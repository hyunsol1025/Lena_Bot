const v = require("../Functions");

let watatenPics = {
    noa: [
        "https://i.pinimg.com/564x/c6/95/14/c69514093f8c935010510ced718fb771.jpg",
        "https://i.pinimg.com/564x/32/68/e3/3268e35b2b5ac7575f6a2d06c1aeefa8.jpg",
        "https://i.pinimg.com/564x/7f/cc/e9/7fcce9aa308a17af642a1aac2ae31c00.jpg",
        "https://i.pinimg.com/564x/06/56/d1/0656d1bdcd280828028c49be2826cce3.jpg"
    ],

    hinata: [
        "https://i.pinimg.com/236x/08/27/58/08275812408762e28ab8d479723ce210.jpg",
        "https://i.pinimg.com/564x/dd/6e/96/dd6e9679ebe2f66aa6b30333ec9fcef2.jpg",
        "https://i.pinimg.com/564x/91/82/39/9182391f980c3d772eaa1c5430a9c22f.jpg"
    ],

    kanon: [
        "https://i.pinimg.com/564x/8c/b9/45/8cb945d4e7a23062d22d6058e6386082.jpg",
        "https://i.pinimg.com/564x/4a/fa/d3/4afad3a5c7b8fa15cbae36f0077f9cd0.jpg"
    ]
}

module.exports = {

    // 랜덤으로 와타텐 사진을 반환하는 메소드
    getRandomWataten: function () {
        var _arr = [];

        switch(v.rand(1, 3)) {
            case 1:
                _arr = watatenPics.hinata;
                break;

            case 2:
                _arr = watatenPics.noa;
                break;

            case 3:
                _arr = watatenPics.kanon;
                break;
        }

        return _arr[v.rand(0, (_arr.length-1))]
    }
}