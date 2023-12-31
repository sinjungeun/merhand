// 휠의 전체적인 기능을 막는 것 
window.addEventListener("wheel", function (e) {
    // 이벤트 함수를 받아서 윈도우의 기본 이벤트를 차단
    e.preventDefault();
    // passive 함수는 이 함수가 작동하는지에 대해 능동적 감시를 수행하는데,
    // passive : false로 두면 감시가 일어나지 않기 때문에 당연히 그냥 원천 차단해버린다. 
}, { passive: false });

// js에서는 html을 변수로 두고 scrollTop을 통해 js 로드 시 혹시라도 만약에 뷰의 Yposition이 0이 아닐 경우를 대비해 다음과 같은 값을 추가
var mHtml = $("html");
var page = 1;

//만약 스크롤 애니메이팅 중일땐 바로 휠 애니메이션을 리턴
mHtml.animate({ scrollTop: 0 }, 10);
$(window).on("wheel", function (e) {
    if (mHtml.is(":animated")) return;
    if (e.originalEvent.deltaY > 0) {
        //deltaY는 휠의 이동량, delta>0이라는 것은 휠을 아래로 내리는 모션을 의미
        //페이지 끝까지 내렸을때는, return을 통해 휠이동 모션을 방지
        if (page == 8) return;
        page++;
    } else if (e.originalEvent.deltaY < 0) {
        //delta<0일때도 deltaY가 음수라면 당연히 휠을 위로 올리는 모션
        //처음으로 끝까지 올렸을때는, return을 통해 휠이동 모션을 방지 
        //증감연산자를 통해 휠 이동 후에 위치하는 페이지를 전역변수에 삽입
        if (page == 1) return;
        page--;
    }
    var posTop = (page - 1) * $(window).height();
    mHtml.animate({ scrollTop: posTop });
})

// 햄버거 버튼 슬라이드
$(document).ready(function () {
    $('.h_btn_hover>a').on('click', function () {
        $('.sidebar_menu').show().animate({
            right: 0
        });
        $('html').css({ 'overflow': 'hidden' }); // 모달팝업 중 html,body의 scroll을 hidden시킴
        // $('#element').on('scroll touchmove mousewheel', function (event) { // 터치무브와 마우스휠 스크롤 방지
        //     event.preventDefault();
        //     event.stopPropagation();
        //     return false;
        // });
        // $('html').on('scroll touchmove mousewheel', function (event) {
        //     event.preventDefault();
        //     event.stopPropagation();
        //     return false;
        // });
    });
    $('.close_btn>a').on('click', function () {
        $('.sidebar_menu').animate({
            right: '-' + 100 + '%'
        }, function () {
            $('.sidebar_menu').hide();
        });
        // $('html').off('scroll touchmove mousewheel');
        // $('html').css({ 'overflow': 'auto' }); //scroll hidden 해제
        // $('#element').off('scroll touchmove mousewheel'); // 터치무브 및 마우스휠 스크롤 가능
        // $('body').off('scroll touchmove mousewheel');
    });

});

// aos 스크롤 효과 사용
AOS.init();

// 햄버거 버튼 슬라이드
function show() {
    document.querySelector(".background").className = "background show";
}

function close() {
    document.querySelector(".background").className = "background";
}
document.querySelector("#show").addEventListener('click', show);
// $('#show').on('click', function () {
//     $('html').css({ 'overflow': 'hidden' }); // 모달팝업 중 html,body의 scroll을 hidden시킴
//     $('html').on('touchmove mousewheel', function (event) {
//         event.preventDefault();
//         event.stopPropagation();
//         return false;
//     });
// });
document.querySelector("#letter_close").addEventListener('click', close);
// document.querySelector("#letter_close").addEventListener('click', close);

// $('#leter_close').on('click', function () {
//     $('html').css({ 'overflow': 'hidden' }); // 모달팝업 중 html,body의 scroll을 hidden시킴
//     $('html').off('touchmove mousewheel', function (event) {
//         event.preventDefault();
//         event.stopPropagation();
//         return false;
//     });
// });
// 커서 별
// <![CDATA[
var colour = "random"; // in addition to "random" can be set to any valid colour eg "#f0f" or "red"
var sparkles = 200; //기본은 50

/****************************
*  Tinkerbell Magic Sparkle *
*(c)2005-13 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
****************************/
var x = ox = 400;
var y = oy = 300;
var swide = 800;
var shigh = 600;
var sleft = sdown = 0;
var tiny = new Array();
var star = new Array();
var starv = new Array();
var starx = new Array();
var stary = new Array();
var tinyx = new Array();
var tinyy = new Array();
var tinyv = new Array();

window.onload = function () {
    if (document.getElementById) {
        var i, rats, rlef, rdow;
        for (var i = 0; i < sparkles; i++) {
            var rats = createDiv(3, 3);
            rats.style.visibility = "hidden";
            rats.style.zIndex = "999";
            document.body.appendChild(tiny[i] = rats);
            starv[i] = 0;
            tinyv[i] = 0;
            var rats = createDiv(5, 5);
            rats.style.backgroundColor = "transparent";
            rats.style.visibility = "hidden";
            rats.style.zIndex = "999";
            var rlef = createDiv(1, 5);
            var rdow = createDiv(5, 1);
            rats.appendChild(rlef);
            rats.appendChild(rdow);
            rlef.style.top = "2px";
            rlef.style.left = "0px";
            rdow.style.top = "0px";
            rdow.style.left = "2px";
            document.body.appendChild(star[i] = rats);
        }
        set_width();
        sparkle();
    }
}

function sparkle() {
    var c;
    if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
        ox = x;
        oy = y;
        for (c = 0; c < sparkles; c++) if (!starv[c]) {
            star[c].style.left = (starx[c] = x) + "px";
            star[c].style.top = (stary[c] = y + 1) + "px";
            star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
            star[c].childNodes[0].style.backgroundColor = star[c].childNodes[1].style.backgroundColor = (colour == "random") ? newColour() : colour;
            star[c].style.visibility = "visible";
            starv[c] = 50;
            break;
        }
    }
    for (c = 0; c < sparkles; c++) {
        if (starv[c]) update_star(c);
        if (tinyv[c]) update_tiny(c);
    }
    setTimeout("sparkle()", 40);
}

function update_star(i) {
    // if (--starv[i] == 25) star[i].style.clip = "rect(10px, 14px, 14px, 10px)";
    if (--starv[i] == 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
    if (starv[i]) {
        stary[i] += 1 + Math.random() * 3;
        starx[i] += (i % 5 - 2) / 5;
        if (stary[i] < shigh + sdown) {
            star[i].style.top = stary[i] + "px";
            star[i].style.left = starx[i] + "px";
        }
        else {
            star[i].style.visibility = "hidden";
            starv[i] = 0;
            return;
        }
    }
    else {
        tinyv[i] = 50;
        tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
        tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
        tiny[i].style.width = "2px";
        tiny[i].style.height = "2px";
        tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
        star[i].style.visibility = "hidden";
        tiny[i].style.visibility = "visible"
    }
}

function update_tiny(i) {
    if (--tinyv[i] == 25) {
        tiny[i].style.width = "1px";
        tiny[i].style.height = "1px";
    }
    if (tinyv[i]) {
        tinyy[i] += 1 + Math.random() * 3;
        tinyx[i] += (i % 5 - 2) / 5;
        if (tinyy[i] < shigh + sdown) {
            tiny[i].style.top = tinyy[i] + "px";
            tiny[i].style.left = tinyx[i] + "px";
        }
        else {
            tiny[i].style.visibility = "hidden";
            tinyv[i] = 0;
            return;
        }
    }
    else tiny[i].style.visibility = "hidden";
}

document.onmousemove = mouse;
function mouse(e) {
    if (e) {
        y = e.pageY;
        x = e.pageX;
    }
    else {
        set_scroll();
        y = event.y + sdown;
        x = event.x + sleft;
    }
}

window.onscroll = set_scroll;
function set_scroll() {
    if (typeof (self.pageYOffset) == 'number') {
        sdown = self.pageYOffset;
        sleft = self.pageXOffset;
    }
    else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
        sdown = document.body.scrollTop;
        sleft = document.body.scrollLeft;
    }
    else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
        sleft = document.documentElement.scrollLeft;
        sdown = document.documentElement.scrollTop;
    }
    else {
        sdown = 0;
        sleft = 0;
    }
}

window.onresize = set_width;
function set_width() {
    var sw_min = 999999;
    var sh_min = 999999;
    if (document.documentElement && document.documentElement.clientWidth) {
        if (document.documentElement.clientWidth > 0) sw_min = document.documentElement.clientWidth;
        if (document.documentElement.clientHeight > 0) sh_min = document.documentElement.clientHeight;
    }
    if (typeof (self.innerWidth) == 'number' && self.innerWidth) {
        if (self.innerWidth > 0 && self.innerWidth < sw_min) sw_min = self.innerWidth;
        if (self.innerHeight > 0 && self.innerHeight < sh_min) sh_min = self.innerHeight;
    }
    if (document.body.clientWidth) {
        if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min) sw_min = document.body.clientWidth;
        if (document.body.clientHeight > 0 && document.body.clientHeight < sh_min) sh_min = document.body.clientHeight;
    }
    if (sw_min == 999999 || sh_min == 999999) {
        sw_min = 800;
        sh_min = 600;
    }
    swide = sw_min;
    shigh = sh_min;
}

function createDiv(height, width) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.overflow = "hidden";
    return (div);
}

function newColour() {
    var c = new Array();
    c[0] = 255;
    c[1] = Math.floor(Math.random() * 256);
    c[2] = Math.floor(Math.random() * (256 - c[1] / 2));
    c.sort(function () { return (0.5 - Math.random()); });
    return ("rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")");
}