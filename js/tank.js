$("#father").animate({
		left:0+"px"
	},300)


// tank 换皮肤
var data=$.cookie("tank");
var data2;			//扑哧

// 如果选中过皮肤浏览器中由data
if(data){
	// 传过来的json字符串先转json对象 然后进行切割 再进行字符串拼接
	data="../img"+JSON.parse(data).img.split('img')[1].split('"')[0];
	$("#air img").attr('src',data);
}

console.log(data);


//让背景动起来
var jsBg1=document.getElementById("bg1");
var jsBg2=document.getElementById("bg2");
var timerBg=setInterval(function(){
	jsBg1.style.top = jsBg1.offsetTop+1+"px";
	jsBg2.style.top = jsBg2.offsetTop+1+"px";
	
	if(jsBg1.offsetTop>=473){
		jsBg1.style.top = "-473px";
	}
	if(jsBg2.offsetTop>=473){
		jsBg2.style.top = "-473px";
	}
},10)

//点击开始
  $("#ready").click(function(){
	  $("#ready").remove();
	  // 倒计时3秒  输出倒计时
	  var n=3;
	  var count=document.getElementById("count");
	  var timercount=setInterval(function(){
	  			  count.innerHTML=n--;
	  },1000)
	  setTimeout(function(){
		  clearTimeout(timercount);
		   count.innerHTML="";
		  var air =document.getElementById("air");
		  
			$("#air>img").click(function(){
				air = addEventListener("mousedown",function(e){
					var ev =e || window.event;
					basex=ev.pageX;
					basey=ev.pageY;
					
					movex=0;
					movey=0;
					//给主屏幕添加鼠标移动事件
					document.getElementById("mainScreen").addEventListener("mousemove",function(e){
						var air =document.getElementById("air");
						var en =e || window.event;
						movex=en.pageX-basex;
						console.log(movex)
						basex=en.pageX;
						movey=en.pageY-basey;
						basey=en.pageY;
						air.style.left=air.offsetLeft+movex+"px";
						air.style.top=air.offsetTop+movey+"px";
					},false)
				},false)
			})	
		  	 
		  	
		  //发射子弹
		  // var timerbullentfly;
		  // var timertankfly;
		  
		  var timerbullent =setInterval(function(){
		  	var air =document.getElementById("air");
		  	var bullent =document.createElement("div");
		  	mainScreen.append(bullent);
		  	bullent.className="bullent";
		  	bullent.style.left=air.offsetLeft+20+"px";
		  	bullent.style.top=air.offsetTop-10 +"px";
		  	
		  	//发射子弹
		  		 var   timerbullentfly=setInterval(function(){
		  			bullent.style.top=bullent.offsetTop-5+"px";
		  			if(bullent.offsetTop<-20){
		  				clearInterval(timerbullentfly);
		  				mainScreen.removeChild(bullent);
		  			}
		  		},10)
		  		 
		  },100)
		  
		  //坦克
		  	var timertank =setInterval(function(){
		  		var bullent =document.createElement("div");
		  		mainScreen.append(bullent);
		  		bullent.className="tank";
		  		function random(){
		  			var r=Math.floor(Math.random()*256);
		  				return r;
		  		}	
		  		bullent.style.left=random()+"px";
		  		bullent.style.top=0+"px";
		  		
		  		//发射坦克
		  		var	   timertankfly=setInterval(function(){
		  				bullent.style.top=bullent.offsetTop+5+"px";
		  				if(bullent.offsetTop>473){
		  					clearInterval(timertankfly);
		  					mainScreen.removeChild(bullent);
		  				}
		  			},30)
		  			 
		  	},500)
		  	
		  	function pzjc(a,b){
		  			var aleft=a.offsetLeft;
		  			var awidth=a.offsetWidth+aleft;
		  			var atop=a.offsetTop;
		  			var aheight=a.offsetHeight+atop;
		  			
		  	
		  			var bleft=b.offsetLeft;
		  			var bwidth=b.offsetWidth+bleft;
		  			var btop=b.offsetTop;
		  			var bheight=b.offsetHeight+btop;
		  			
		  			if(!(aleft>bwidth || awidth<bleft || atop>bheight ||aheight<btop)){
		  				
		  				return true;
		  			}else {
		  				return false;
		  			}
		  		}
		  	// 敌人死亡和子弹碰撞
		    var num=0;
		  	var timerpzjc=setInterval(function(){
		  		var allbullent=document.getElementsByClassName("bullent");
		  		var alltank=document.getElementsByClassName("tank");
		  			for(var i = 0 ;i<allbullent.length;i++) {
		  				for(var j =0 ;j<alltank.length;j++){
		  					var b=allbullent[i];
		  					var t=alltank[j];
		  					if(pzjc(b,t)){
		  							grade.innerHTML="击落"+num++;
		  						mainScreen.removeChild(t);
		  						mainScreen.removeChild(b);
		  						break;
		  						
		  					}
		  				}
		  		}
		  	},100)
		  		
		// 来个boss		
				setTimeout(function(){
					var boss=document.createElement("div");
					boss.className="boss";
					mainScreen.append(boss);
					var spend=3;
					var timerbossmove=setInterval(function(){
						boss.style.left=boss.offsetLeft+spend+"px";
						if(boss.offsetLeft<0){
							spend*=-1;
							boss.style.left=0;
						}
						if(boss.offsetLeft+boss.offsetWidth>299){
							spend*=-1;
							boss.style.left=299;
						}
					},20)
					
					//box的碰撞检测
					var number=0;
						var timerboxpzjc=setInterval(function(){
							var allbullent=document.getElementsByClassName("bullent");
							for(var i=0;i<allbullent.length;i++){
								if(pzjc(allbullent[i],boss)) {
									allbullent[i].remove();
									number++;
									if(number==200){
										$(".boss").remove();
									}
									$(".boss").css({
										backgroundColor:"red",
									})
									console.log("碰撞");
								} else {
									$(".boss").css({
										backgroundColor:" ",
									})
									console.log("没碰撞");
								}
								
							}
						},10)
						
					
					
				},10)
				
				
				
				
		  		//飞机的死亡检测
		  
		  		var timerair=setInterval(function(){
		  			var alltank=document.getElementsByClassName("tank");
		  			var air=document.getElementById("air");
		  			var grade=document.getElementById("grade");
		  			for(var j =0 ;j<alltank.length;j++){
		  				if(pzjc(air,alltank[j])){
		  					var did=document.createElement("h1");
		  					did.innerHTML="游戏结束";
		  					mainScreen.appendChild(did);
		  					clearInterval(timerbullent);
		  					clearInterval(timertank);
		  					clearInterval(timerbullentfly);
		  					clearInterval(timertankfly);
		  					break;
		  				}
		  			}
		  		},100)
	  },4000)
	 
		
  })
	
	
	
	// 点击return 按钮返回主页
	$("#return").click(function(){
		document.getElementById("father").style.transform='rotate(0deg)scale(0.5)';
		$("#father").animate({
			left:1500+"px"
		},300)
		
		
		setTimeout(function(){
			window.location.replace("../index.html");
		},400)	
	})
	
	
	
	
