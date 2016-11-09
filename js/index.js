$(function(){
	var audio=$("audio").get(0);
		var play=$("#play");
		var progress=$("#progress");
		var duration=$("#duration");
		var current=$("#currenttime");
		var pi=$("#p-i");
		var volume=$("#volume");
		var vi=$("#v-i");
		var mute=$("#mute");
		var btnp=$(".btn-p");
		var btnl=$(".btn-l");
		var btnr=$(".btn-r");
		var prog=$("#prog");
		var prog1=$("#prog1");
		var pi1=$("#pi");
		var musiclist=$("#music-list");
	   	var xin=$(".xin");
	   	var xinn=0;
	   	var listm=$("#list-m");
	   	var close=$("#close");
	   	var span1=$("#del-list span:nth-of-type(1)");
	   	var span2=$("#del-list span:nth-of-type(2)");
	   	var span4=$("#del-list span:nth-of-type(4)");
	   	var span5=$("#del-list span:nth-of-type(5)");
	   	var ple=$("#ple");
		var volumepage=$("#volume-page");
		var volumepagem=$("#volume-page-main");
		var qux=$("#quxiao");
		var player=$("#player");
// 修改事件方式
		function format(v){
			v=Math.floor(v);
			var s=v%60;
			s=(s<10)?("0"+s):s;
			var m=Math.floor(v/60);
			m=(m<10)?("0"+m):m;
			return m+":"+s;
		}
// 点击播放暂停
		function player1(){
			if (audio.paused) {
				audio.play();	
			}else{
				audio.pause();	
			}
			
			play.addClass("xia");
			play.delay(100).queue(function(){
				$(this).removeClass().dequeue();
			})	
		}
		play.on("touchend",player1);  
		btnp.on("touchend",player1);
		$(audio).on("play",function(){
			play.html("&#xe602;");
			btnp.html("&#xe602;");
			$("#im2").removeClass().addClass("rotate");
		})
		$(audio).on("pause",function(){
			play.html("&#xe778;");
			btnp.html("&#xe778;");
			$("#im2").removeClass().addClass("rotater");
		})
//按钮向下动
		$(".an1 div:nth-of-type(2)").on("touchend",function(){
			var aa=$(this).closest(".an1");
			var index=aa.index();
			$(this).addClass("xia");
			$(this).delay(100).queue(function(){
				$(this).removeClass().dequeue();
			})	
		})
// 获取以播放的 长度
		function pro(e){
			var offsetX=e.originalEvent.changedTouches[0].clientX-progress.offset().left;
			audio.currentTime=offsetX/progress.width()*audio.duration;
			return false;
		}
		progress.on("touchend",pro);
		prog1.on("touchend",pro);
// 播放的时候执行的函数
		$(audio).on("timeupdate",function(){
			current.html(format(audio.currentTime));
			var left=progress.width()*audio.currentTime/audio.duration-pi.width()/2;
			var width=prog.width()*audio.currentTime/audio.duration;
			pi1.css("width",width);
			pi.css("left",left);
		})
// 调节音量
		volume.on("touchstart",function(e){
			var offsetX=e.originalEvent.changedTouches[0].clientX-volume.offset().left;
			//e.offset=e.originalEvent.changedTouches[0].clientX-volume.position().left;
			audio.volume=offsetX/volume.width();
			mute.removeAttr("data-v");
			return false;
		})

// 静音
		mute.on("touchend",function(){
			if($(this).attr("data-v")){
				audio.volume=$(this).attr("data-v");
				$(this).removeAttr("data-v");
			}else{
				$(this).attr("data-v",audio.volume);
				audio.volume=0;
			}
			return false;
		})
// 音量事件驱动
		$(audio).on("volumechange",function(){
			vi.css("left",volume.width()*audio.volume-vi.width()/2);
			if(audio.volume==0){
				mute.html("&#xe63b;");
			}
			else if(audio.volume<0.5){
				mute.html("&#xe63c;");
			}
			else if(audio.volume>0.5){
				mute.html("&#xe63d;");
			}
			return false;
		})
// pi vi 阻止冒泡事件
		pi.on("touchend",false);
		pi1.on("touchend",false);
		vi.on("touchend",false);
// pi滚动
		function gundong(e){
			var r=pi.width()/2;
			var offsetX=e.originalEvent.changedTouches[0].clientX-pi.offset().left;
			var start=r-offsetX;
			
			$(document).on("touchmove",function(e){
				var left=e.originalEvent.changedTouches[0].clientX-progress.offset().left+start;
				var c=left/progress.width()*audio.duration;
				if (c>=audio.duration||c<=0) {
						return ;
				}
				audio.currentTime=c;
			})
			return false;
		}
		pi.on("touchstart",gundong);
//pi1滚动
		pi1.on("touchstart",function(e){
			var r=pi.width()/2;
			var offsetX=e.originalEvent.changedTouches[0].clientX-pi1.offset().left;
			console.log(offsetX);
			var start=r-offsetX;
			pi1.css("width",offsetX);
			$(document).on("touchmove",function(e){
				var left=e.originalEvent.changedTouches[0].clientX-progress.offset().left+start;
				var c=left/progress.width()*audio.duration;
				if (c>=audio.duration||c<=0) {
						return ;
				}
				audio.currentTime=c;
			})
			return false;
			
		});
		$(document).on("touchend",function(){
			$(document).off("touchmove");
		})
// vi滚动
		player.on("touchstart",vi,function(e){
			var r=vi.width()/2;
			var offsetX=e.originalEvent.changedTouches[0].clientX-vi.offset().left;
			var start=r-offsetX;
			$(document).on("touchmove",function(e){
				var left=e.originalEvent.changedTouches[0].clientX-volume.offset().left+start;
				var c=left/volume.width();
				if (c<0||c>1) {
					return;
				}
				audio.volume=left/volume.width();
			})
			return false;
		})
// 添加歌曲
	var currentIndex=0;
	var musics=[
		{
			name:"不要说话",
			author:"陈奕迅",
			src:"陈奕迅 - 不要说话.mp3",
			sq:"&#xe605;"
		},
		{
			name:"不再见",
			author:"陈学冬",
			src:"陈学冬 - 不再见.mp3",
			sq:"&#xe605;"
		},
		{
			name:"只要有你",
			author:"那英、孙楠",
			src:"那英、孙楠 - 只要有你.mp3",
			sq:"&#xe605;"
		},
		{
			name:"我们不该这样的",
			author:"张赫宣",
			src:"张赫宣 - 我们不该这样的.mp3",
			sq:"&#xe605;"
		}
	]
//定义函数
var ul=$("#list-m ul");
    function render(){
    	ul.empty();
    	$.each(musics,function(index,val){
    		var c=(index==currentIndex)? "ft-co":"";
    		$("<li class='"+c+"'><span>"+musics[index].name+"</span><i>"+musics[index].sq+"</i><span>"+musics[index].author+"</span><span class='delete'>&#xe6cb;</span><span class='xin'>&#xe665;</span></li>").appendTo(ul);
    	})
    }  
    render();
//点击哪首哪首播放
	function dianji(){
		$("li").removeClass("active");
    	$(this).addClass("active");
    	currentIndex=$(this).index();
    	audio.src=musics[currentIndex].src;
    	audio.play();
    	return false;
	}
    ul.on("touchend","li",dianji);
// 下一首
   var next=$("#bb");
   var btnr=$(".btn-r");
   function nextf(){
   		currentIndex++;
   		if (currentIndex>musics.length-1) {
   			currentIndex=0;
   		}
   		$("li").removeClass("active");
		$("li").eq(currentIndex).addClass("active");
   		audio.src=musics[currentIndex].src;
    	audio.play();
    	return false;
   }
   next.on("touchend",nextf);
   btnr.on("touchend",nextf);
   
   // 上一首
    var pre=$("#aa");
    var btnl=$(".btn-l");
    function prev(){
    	currentIndex--;
   		if (currentIndex<=0) {
   			currentIndex=musics.length-1;
   		}
   		$("li").removeClass("active");
		$("li").eq(currentIndex).addClass("active");
   		audio.src=musics[currentIndex].src;
    	audio.play();
    	return false;
    }
   	pre.on("touchend",prev);
   	btnl.on("touchend",prev);
//audio 函数
//歌名 作者
	$(audio).on("canplay",function(){
		$(".title").html(musics[currentIndex].name);
		$("#singer").html(musics[currentIndex].author);
		$("li").removeClass("ft-co").eq(currentIndex).addClass("ft-co");
		$("li span:nth-of-type(2)").removeClass("ft-co").eq(currentIndex).addClass("ft-co");
//		audio.play();
		duration.html(format(audio.duration));	
	})
	$(audio).on("ended",function(){
		nextf();
	})
//列表删除 一定不要冒泡
	ul.on("touchend",".delete",function(){
		var aa=$(this).closest("li");
		var index=aa.index();
		musics.splice(index,1);
		if(index==currentIndex){
			if(musics[currentIndex]){
				audio.src=musics[currentIndex].src;
			}
			else{
				audio.src="";
				if(currentIndex==musics.length-1){
					currentIndex=0;
				}
//				currentIndex=0;
//				musics[currentIndex].src
			}
		}
		else if(index>currentIndex){
				
			}
		else if(index<currentIndex){
			currentIndex-=1;
		}
		render();
		return false;
	}) 
//添加歌曲
	$(".song-list").on("touchend",".song",function(){
		var a=$(this).attr("data-v");
		musics.push(JSON.parse(a));
		render();
		return false;
	})
//歌词播放页面
	//左滑
	var hl=$("#h-left1");
	var wol=$("#words-list");
	var stpos1;
	wol.on("touchstart",function(e){
		stpos1=e.originalEvent.changedTouches[0].clientX;
		return false;
	})
	wol.on("touchend",function(e){
		var endpos=e.originalEvent.changedTouches[0].clientX;
		if(endpos-stpos1>50){
			wol.removeClass().addClass("hl");
		}
		return false;
	})
	//左上按钮
	hl.on("touchend",function(){
		wol.removeClass().addClass("hl");
		return false;
	})
	//底部五个选项
	//	1
	var cn=0;
	var c1=$(".collection:nth-of-type(1)");
	c1.on("touchend",function(){
		if(cn%2==0){
			c1.html("&#xe640;").css("color","#da254b");
		}
		else{
			c1.html("&#xe665;").css("color","#acaba2");
		}
		cn++;
	})
	//2
	var c2=$(".collection:nth-of-type(2)");
	var c2arr=["&#xe606;","&#xe67f;","&#xe60c;"];
	var c2n=0;
	c2.on("touchend",function(){
		c2n++;
		if(c2n==c2arr.length){
			c2n=0;
		}
		c2.html(c2arr[c2n]);
	})
	//5
	var c5=$(".collection:nth-of-type(5)");
	c5.on("touchend",function(){
		musiclist.css("display","block");
		listm.removeClass().addClass("to-top");
	})
//播放页面
	
	var stpos;
	$("#ple").on("touchstart",function(e){
		stpos=e.originalEvent.changedTouches[0].clientX;
		return false;
	})
	$("#ple").on("touchend",function(e){
		var endpos=e.originalEvent.changedTouches[0].clientX;
		if(endpos-stpos<-50){
			wol.removeClass().addClass("hr");
		}
		return false;
	})
   	
   	
//歌词列表
   	ul.on("touchend",".xin",function(){
   		var aa=$(this).closest('li');
		var index=aa.index();
   		if(xinn%2==0){
   			$(".xin").eq(index).html("&#xe640;").css("color","#d42054");
   		}
   		else{
   			$(".xin").eq(index).html("&#xe665;").css("color","#858a8e");
   		}
   		xinn++;
   		return false;
   	})
//关闭歌词列表页面
	function mclist(){
		musiclist.css("display","none");
		listm.removeClass().addClass("to-bottom");
		return false;
	}
	musiclist.on("touchend",mclist);
	close.on("touchend",mclist);
	
//歌词列表改变播放方式
    var span11=0;
    var c2arr1=["&#xe606;","&#xe67f;","&#xe60c;"];
	var c2n1=0;
    var span12=["顺序循环","单曲循环","随机循环"];
	span1.on("touchend",function(){
		c2n1++;
		if(c2n1==c2arr.length){
			c2n1=0;
		}
		span1.html(c2arr1[c2n1]);
		span2.html(span12[c2n1]);
		return false;
	}) 	
//全部删除
	span4.on("touchend",function(){
		musics.splice(0,4)
		$("#list-m li").remove();
		audio.src="";
		return false;
	})
//歌曲添加列表
	var hleft2=$("#h-left2");
	var hright2=$("#h-right2");
	var raise=$("#raise");
	var tmic=$("#t-mic");
   	hleft2.on("touchend",function(){
   		raise.removeClass().addClass("hl");
   	})
   	tmic.on("touchend",function(){
   		raise.removeClass().addClass("hr");
   	})
   	span5.on("touchend",function(){
   		raise.removeClass().addClass("hr");
   	})
   	hright2.on("touchend",function(){
   		raise.removeClass().addClass("hl");
   	})
//音量调节页面
//	var tbul=$(".tubiao-main ul");
//	var tbmain=$(".tubiao-main");
//	var tbpos;
//	$(".tubiao-main").on("touchstart","ul",function(e){
//		tbpos=e.originalEvent.changedTouches[0].clientX;
//		return false;
//	})
//	$(".tubiao-main").on("touchend","ul",function(e){
//		var tbendpos=e.originalEvent.changedTouches[0].clientX;
//		if(tbendpos-tbpos>50&&tbul.attr("data-t")){
//			tbul.removeClass().addClass("tubiaor");
//			tbul.removeAttr("data-t");
//		}
//		if(tbendpos-tbpos<-50){
//			tbul.removeClass().addClass("tubiaol");
//			tbul.attr("data-t","a");
//		}
//		return false;
//	})
//	var tbul1=$(".tubiao-main1 ul");
//	var tbmain1=$(".tubiao-main1");
//	var tbpos1;
//	$(".tubiao-main1").on("touchstart","ul",function(e){
//		tbpos1=e.originalEvent.changedTouches[0].clientX;
//		return false;
//	})
//	$(".tubiao-main1").on("touchend","ul",function(e){
//		var tbendpos1=e.originalEvent.changedTouches[0].clientX;
//		if(tbendpos1-tbpos1>50&&tbul1.attr("data-t")){
//			tbul1.removeClass().addClass("tubiaor");
//			tbul1.removeAttr("data-t");
//		}
//		if(tbendpos1-tbpos1<-50){
//			tbul1.removeClass().addClass("tubiaol");
//			tbul1.attr("data-t","a");
//		}
//		return false;
//	})
//歌词界面开关
	$("#im1").on("touchend",function(){
		volumepage.css("display","block");
		volumepagem.removeClass().addClass("to-top");
		return false;
	})
	qux.on("touchend",function(){
		volumepage.css("display","none");
		volumepagem.removeClass().addClass("to-bottom");
		return false;
	})
	volumepage.on("touchend",function(){
		volumepage.css("display","none");
		volumepagem.removeClass().addClass("to-bottom");
		return false;
	})
})