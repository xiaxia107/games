//开个延时器
	// $("body").animate({
	// 	left:-740+"px"
	// },200)

// 点击返回时跳转回去 
$("#return").click(function(){
	document.getElementById("father").style.transform='rotate(0deg)scale(0.5)';
	$("#father").animate({
		left:1470+"px"
	},300)
	
	
	setTimeout(function(){
		window.location.replace("../index.html");
	},400)	
})

// 小鸟的皮肤处理
var data=$.cookie("data");
var data2;			//扑哧
// 如果选中过皮肤浏览器中由data
if(data){
	// 传过来的json字符串先转json对象 然后进行切割 再进行字符串拼接  这是不扑哧
	data="../img"+JSON.parse(data).img.split('img')[1].split('"')[0];
	
	// 扑哧的
	data2=data.split(1)[0]+"2"+data.split(1)[1];
}

console.log(data,data2);

var canvas=document.getElementById("canvas");
					// $("canvas")[0] 一样
var context=canvas.getContext("2d");
var img=new Image();
img.className="bird";
if(data){
	img.src=data;
}else {
	img.src="../img/bird1.png";
}

var birdx=20;
var t=true;
var birdy=70;
var timerfall; 
img.onload=function(){  //每次img进来之前要清空定时器
	clearInterval(timerfall);
		timerfall=setInterval(function(){
		if(birdy<370){
			birdy++;
		}
		context.clearRect(0,0,800,400);
		context.drawImage(img,birdx,birdy,40,25);
		drawcolumn();
	},10)
	
}

//小鸟飞


	$("html").mousedown(function(){
		if(data){
			img.src=data2;
		}else{
			img.src="../img/bird3.png";
		}
		if(birdy>60){
			birdy-=40;
				console.log(t);
		}
	
	})
	$("html").mouseup(function(){
		if(data){
			img.src=data;
		}else{
			img.src="../img/bird1.png";
		}
	})

	

//创造柱子
var arr=[];
var timercolumn;
function createcolumn(){
	clearInterval(timercolumn);
	timercolumn=setInterval(function(){
		var obj={};
		obj.x=800;
		obj.y=-parseInt(Math.random()*250+300);
		obj.column1=new Image();
		obj.column2=new Image();
		obj.column1.src="../img/posttop.png";
		obj.column2.src="../img/postdowm.png";
		obj.id=new Date().getTime();
		arr.push(obj);
	},2500)
}
createcolumn();
//画出柱子 
var score=0;
var temp=-1;
function drawcolumn(){
	for(var i=0;i<arr.length;i++){
		arr[i].x--;
		context.drawImage(arr[i].column1,arr[i].x,arr[i].y);
		context.drawImage(arr[i].column2,arr[i].x,arr[i].y+700);
		//积分
		if(birdx+38>=arr[i].x && birdx-71<=arr[i].x){ //限定经过第arr[i]跟管子的时候
			if(arr[i].id!=temp){ //和第arr[i]根管子比较
				score++;
				temp=arr[i].id;
				$("#grade").text("分数："+score);
			}
			if(birdy<571+arr[i].y ||birdy+40>arr[i].y+718){
				clearInterval(timercolumn);
				clearInterval(timerfall);
				$("html").unbind();
				if(score<10){
					alert("菜逼才"+(score-1)+"分");
				} else if (score<20){
					alert("宝贝不是菜逼了 "+(score-1)+"分");
				}else{
					alert("别玩了通关了宝贝 "+(score-1)+"分");
				}
				
			}
		}
	}
	
}



// 单机按钮跳到详细
 $("#introduce").click(function(){
	 document.getElementById("father").style.transform='rotate(0deg) scale(0.5)';
	 $("#father").animate({
	 	left:-1470+"px"
	 },200)
	 
	 
	 setTimeout(function(){
	 	window.location.replace("../html/introduce.html");
	 },400)	
 })