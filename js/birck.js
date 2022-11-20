//开个延时器
$("#father").animate({
    left: 0 + "px"
}, 200)

//构造函数
function blockbreak() {
    this.box = $("#box");
    this.plank = $("#plank");
    this.list = document.getElementsByTagName("li");
    this.spendx = 2;
    this.spendy = -2;
    this.topinit = 0;
    this.leftinit = 0;
}
var bb = new blockbreak();
//随机颜色
function randomcolor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

//砖块的排放
bb.discharge = function() {
    for (var i = 0; i < this.list.length; i++) {
        this.list[i].style.backgroundColor = randomcolor();
        var x = this.leftinit * this.list[0].offsetWidth;
        var y = this.topinit;
        this.list[i].style.left = x + "px";
        this.list[i].style.top = y + "px";
        this.leftinit++;
        if ((i + 1) % 6 == 0) {
            this.leftinit = 0;
            this.topinit += this.list[0].offsetHeight;
        }
    }
}

//调用砖块摆放

bb.discharge();

//板子的移动
$("#plank").click(function(e) { //到时候设计一个开始按钮来解决多次点击的问题
    var ext = e || event;
    var currentx = ext.pageX;
    console.log(currentx)
    $("#box,.big,#plank").mousemove(function(e) {
        var evt = e || event;
        var move = evt.pageX - currentx;
        currentx = evt.pageX; //这里注意当前位子是移动指针的位子
        $("#plank").css({
            left: move + $("#plank")[0].offsetLeft,
        })
        if ($("#plank")[0].offsetLeft <= 0) {
            $("#plank").css({
                left: 0,
            })
        }
        if ($("#plank")[0].offsetLeft + $("#plank")[0].offsetWidth >= $("#box ul")[0].offsetLeft + $("#box ul")[0].offsetWidth) {
            $("#plank").css({
                left: 500,
            })
        }
    })
})

// 小球的移动与反弹
var n = 0;
$("#plank").click(function() {
    //游戏难度选择用户交互模式
    if ($("#control input[type=radio]:eq(0)").prop("checked")) {
        bb.spendx = 2;
        bb.spendy = -2;
    }
    if ($("#control input[type=radio]:eq(1)").prop("checked")) {
        bb.spendx = 5;
        bb.spendy = -5;
    }
    if ($("#control input[type=radio]:eq(2)").prop("checked")) {
        bb.spendx = 10;
        bb.spendy = -10;
    }

    $("#hint").text(""); //去除提示文字
    var timerball = setInterval(function() {
        $("#ball").css({
                top: $("#ball")[0].offsetTop + bb.spendy + "px",
                left: $("#ball")[0].offsetLeft + bb.spendx + "px",
            })
            //开启碰撞检测
        if ($("#ball")[0].offsetLeft + $("#ball")[0].offsetWidth >= $("#box ul")[0].offsetLeft + $("#box ul")[0].offsetWidth) {
            bb.spendx *= -1;
        }
        if ($("#ball")[0].offsetTop <= $("#box ul")[0].offsetTop) {
            bb.spendy *= -1;
        }
        if ($("#ball")[0].offsetLeft <= $("#box ul")[0].offsetLeft) {
            bb.spendx *= -1;
        }
        //下方的碰撞
        if ($("#ball")[0].offsetTop + $("#ball")[0].offsetWidth >= $("#box ul")[0].offsetTop + $("#box ul")[0].offsetHeight) {
            clearInterval(timerball);
            alert("彩笔还妄想打猛男模式，试试残疾人模式巴适");
        }
        //小球与砖块的碰撞
        for (var j = 0; j < bb.list.length; j++) {
            if ($("#ball")[0].offsetTop < bb.list[j].offsetTop + bb.list[j].offsetHeight - 5 && $("#ball")[0].offsetLeft + $("#ball")[0].offsetWidth >= bb.list[j].offsetLeft && $("#ball")[0].offsetLeft - bb.list[j].offsetWidth <= bb.list[j].offsetLeft) {
                //关键就三个位子的判断   类比鸟 
                //1.鸟的left+鸟的宽度大于管子的left
                //2.鸟的left-管子的宽度小于管子的left
                //3.鸟的top小于下管子  大于上管子
                bb.list[j].style.display = "none";
                bb.spendy *= -1;
                n++;
            }
        }
        $("#grade").text("努力加载中 " + n + "")
            //板子的碰撞
        if ($("#ball")[0].offsetTop + $("#ball")[0].offsetHeight > $("#plank")[0].offsetTop && $("#ball")[0].offsetLeft + $("#ball")[0].offsetWidth >= $("#plank")[0].offsetLeft && $("#ball")[0].offsetLeft - $("#plank")[0].offsetWidth <= $("#plank")[0].offsetLeft) {
            bb.spendy *= -1;
        }
    }, 10)
})


//rest
$("#rest").click(function() {
    location.assign("");
})

//left 和rigth 控制 挡板的移动
var timermove = setInterval(function() {
    $("#left").mousemove(function() {
        $("#plank").css({
            left: $("#plank")[0].offsetLeft - 1,
        })

        if ($("#plank")[0].offsetLeft <= 0) {
            $("#plank").css({
                left: 0,
            })
        }
        // if($("#plank")[0].offsetLeft+$("#plank")[0].offsetWidth>=$("#box ul")[0].offsetLeft+$("#box ul")[0].offsetWidth){
        // 	$("#plank").css({
        // 		left:500,
        // 	})
    })
}, 100)




// 点击返回时跳转回去 并传个 1 告诉主页向左
$("#return").click(function() {
    document.getElementById("father").style.transform = 'rotate(0deg)scale(0.7)';
    $("#father").animate({
        left: 1500 + "px"
    }, 200)


    setTimeout(function() {
        window.location.replace("../index.html");
    }, 400)
})