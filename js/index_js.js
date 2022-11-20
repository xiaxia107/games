//下面写的是细节菜单  鼠标滚轮到xxx  px 弹出
var flat=true;
var timermove;
$(window).scroll(function(){
	var srcolltop=$(window).scrollTop();
	if(srcolltop>700){
		$("#menu").css({
			left:50+"px",
		})
		
		$("#message").css({
			right:100+"px",
		})
	}else {
		$("#menu").css({
			left:-300+"px",
		})
		
		$("#message").css({
			right:-700+"px",
		})
		
		// 右边选择皮肤页页消失
		// $('#message').css({
		// 	display:"none"
		// })
	}
	if(!flat){
		clearInterval(timermove)
	}
	
	flat=false;
	
})


// 点击下拉按钮icon  往下移动

$("#slidedowm").click(function(){
		timermove=setInterval(function(){
		var current=$(window).scrollTop();
		//  top  跳到   545 px 
		var spend=(545-current)/10;
		$(window).scrollTop(current+spend);
		console.log(spend)
		// 到了537就可以清除定时器了
		if(current>=537){
			clearInterval(timermove)
		}
		flat=true;
	},20)
})


	// 按下按钮显示右边
	for(var i=1;i<=4;i++){
		//存下标
		var div=$("#menu>div");
			div[i].index=i;
		$("#menu>div:eq("+i+")").click(function(){
			$("#message").css({
				display:'block'
			})
		
		// 4个界面都隐藏
		
		for(var k=1;k<=4;k++){
			$('#message>div:eq('+k+')').css({
				display:'none'
			})
		}
		
		
			
		$("#message>div:eq("+this.index+")").css({
				display:'block'
			})
		})
	}
	
	
	
	// 小鸟的选中界面
	// 直接存下地址
	var currentimg;
	
	var san=$("#message_birds>div");
	for(var t=0;t<san.length;t++){
		san[t].index=t;
		$('#message_birds>div').click(function(){
			currentimg=$(this).css('background-image');
			// console.log(currentimg.split("\"")[1])
			for(var q=0;q<=2;q++){
				$('#message_birds i:eq('+q+')').css({
					display:'none'
				})
			}
			
			$('#message_birds i:eq('+this.index+')').css({
				display:'block'
			})
		})
	}
	
	
	// 小鸟按钮的提交
	$("#message_birds_button").click(function(){
		//获取当前图片的路径
		var data={
			img:currentimg,
		}
		$.cookie("data",JSON.stringify(data));
		//记得字符串切割
	})
	
	
	// 页面的跳转
	$("#button_2").click(function(){
		// 页面整体缩放向左移动
		
		document.getElementById("father").style.transform='rotate(0deg)scale(0.5)';
		$("#father").animate({
			left:-1400+"px"
		},300)
		setTimeout(function(){
			window.location.replace("html/birdfly.html");
		},400)
		
	})
	
	
	// 点击坦克的按钮跳转到tank
	$("#button_1").click(function(){
		document.getElementById("father").style.transform='rotate(0deg)scale(0.5)';
		$("#father").animate({
			left:-1400+"px"
		},300)
		setTimeout(function(){
			window.location.replace("html/tank.html");
		},400)
	})


	
	// 点击推箱子的按钮跳转到brick
	$("#button_3").click(function(){
		document.getElementById("father").style.transform='rotate(0deg)scale(0.5)';
		$("#father").animate({
			left:-1400+"px"
		},300)
		setTimeout(function(){
			window.location.replace("html/Brick.html");
		},400)
	})
	
	
	
	
	
	
	
	// 飞机的选中界面
	
	// 直接存下地址
	var currentair;
	
	var san=$("#message_tank>div");
	for(var t=0;t<san.length;t++){
		san[t].index=t;
		$('#message_tank>div').click(function(){
			currentair=$(this).css('background-image');
			// console.log(currentair.split("\"")[1])
			for(var q=0;q<=3;q++){
				$('#message_tank i:eq('+q+')').css({
					display:'none'
				})
			}
			
			$('#message_tank i:eq('+this.index+')').css({
				display:'block'
			})
		})
	}
	
	
	// 飞机按钮的提交
	$("#message_tank_button").click(function(){
		//获取当前图片的路径
		console.log(currentair)
		var data={
			img:currentair,
		}
		$.cookie("tank",JSON.stringify(data));
		//记得字符串切割
	})
	
	
	
	
	
	
	$("#menu_rest").click(function(){
			// 页面整体缩放向左移动
			document.getElementById("father").style.transform='rotate(0deg)';
			$("#father").animate({
				left:-1400+"px"
			},300)
			setTimeout(function(){
				window.location.replace("html/Classify.html");
			},400)
			
		
	})