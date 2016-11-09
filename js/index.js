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
			play2();
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
		vi.on("touchstart",function(e){
			var r=vi.width()/2;
			var offsetX=e.originalEvent.changedTouches[0].clientX-vi.offset().left;
			var start=r-offsetX;
			vi.on("touchmove",function(e){
				var left=e.originalEvent.changedTouches[0].clientX-volume.offset().left+start;
				var c=left/volume.width();
				if (c<0||c>1) {
					return;
				}
				audio.volume=left/volume.width();
			})
			return false;
		})
		vi.on("touchend",function(){
			vi.off("touchmove");
		})
// 添加歌曲
	var currentIndex=0;
	var musics=[
		{
			name:"不要说话",
			author:"陈奕迅",
			src:"陈奕迅 - 不要说话.mp3",
			sq:"&#xe605;",
			content:"[00:01.43]陈奕迅 - 不要说话[00:17.87]深色的海面布满白色的月光[00:24.99]我出神望著海星不知飞哪去[00:30.84]听到他在告诉你[00:34.70]说他真的喜欢你[00:37.98]我不知该 躲哪里[00:46.54]爱一个人是不是应该有默契[00:53.70]我以为你懂得每当我看著你[00:59.50]我藏起来的秘密[01:03.41]在每一天清晨里[01:06.73]暖成咖啡 安静的拿给你[01:13.85]愿意 用一支黑色的铅笔[01:18.35]画一出沉默舞台剧[01:22.47]灯光再亮 也抱住你[01:28.22]愿意 在角落唱沙哑的歌[01:32.67]再大声也都是给你[01:37.03]请用心听 不要说话[01:51.08]爱一个人是不是应该要默契[01:58.19]我以为你懂得每当我看著你[02:03.99]我藏起来的秘密[02:07.79]在每一天清晨里[02:11.20]暖成咖啡 安静的拿给你[02:18.32]愿意 用一支黑色的铅笔[02:22.82]画一出沉默舞台剧[02:27.18]灯光再亮 也抱住你[02:32.92]愿意 在角落唱沙哑的歌[02:37.15]再大声也都是给你[02:41.25]请用心听 不要说话[03:15.70]愿意 用一支黑色的铅笔[03:20.19]画一出沉默舞台剧[03:24.52]灯光再亮 也抱住你[03:30.08]愿意 在角落唱沙哑的歌[03:34.49]再大声也都是给你[03:38.65]请原谅我 不会说话[03:44.32]愿意 用一支黑色的铅笔[03:48.73]画一出沉默舞台剧[03:52.96]灯光再亮 也抱住你[03:58.63]愿意 在角落唱沙哑的歌[04:03.12]再大声也都是给你[04:07.28]爱是用心吗 不要说话"
		},
		{
			name:"不再见",
			author:"陈学冬",
			src:"陈学冬 - 不再见.mp3",
			sq:"&#xe605;",
			content:"[00:01.43]陈学冬 - 不再见[00:15.60]离别没说再见 [00:19.45]你是否心酸[00:23.01]转身寥寥笑脸 [00:26.72]不甘的甘愿[00:30.37]也许下个冬天 [00:34.08]也许还十年[00:37.65]再回到你身边 [00:41.55]为你撑雨伞[00:46.96]剩几个夜晚 [00:50.62]再几次晚安[00:53.97]等你摘下还戴上指环[01:01.24]原谅捧花的我盛装出席[01:05.35]只为错过你[01:08.56]祈祷天灾人祸分给我[01:12.61]只给你这香气[01:15.96]但我卑微奢求让我[01:19.32]存留些许的气息[01:23.39]好让你在梦里能想起[01:27.46]我曾紧抱你的 力气[01:45.81]以后遇见风雪 [01:49.72]有新的雨伞[01:53.43]为我留的灯盏 [01:57.13]能不能别关[02:00.83]不要为我伤感 [02:04.44]别被绝望打断[02:07.90]不能一起的白头 [02:11.55]也别让风雪染[02:17.81]再一个明天 下一世人间[02:24.27]等我再为你戴上指环[02:31.73]原谅捧花的[02:33.73]我盛装出席却只为献礼[02:39.14]目送洁白纱裙[02:41.35]路过我对他说我愿意[02:46.41]但我继续[02:47.81]清扫门前的路和那段阶梯[02:54.03]如果你疲惫时[02:56.14]别忘记那里还能停留[03:01.30]休息[03:16.28]原谅捧花的我[03:18.33]盛装出席只为错过你[03:23.39]祈祷天灾人祸分给我[03:27.45]只给你这香气[03:30.75]我想大言不惭[03:33.11]卑微奢求来世再爱你[03:38.27]希望每晚星亮入梦时[03:42.18]有人来代替我 [03:45.94]吻你"
		},
		{
			name:"只要有你",
			author:"那英、孙楠",
			src:"那英、孙楠 - 只要有你.mp3",
			sq:"&#xe605;",
			content:"[00:01.43]那英、孙楠 - 只要有你[00:22.92]谁能告诉我 有没有这样的笔[00:28.28]能画出一双双 不流泪的眼睛[00:34.38]留得住世上 一纵即逝的光阴[00:39.96]能让所有美丽 从此也不再凋零[00:45.66]如果是这样 我可以安慰自己[00:51.10]在没有你的夜里 能画出一线光明[00:57.25]留得住快乐 全部都送去给你[01:02.53]苦涩的味道变了甜蜜[01:08.23]从此也不用分开相爱的天和地[01:13.85]还能在冬雨天空月亮太阳再相遇[01:19.58]生命中只要有你 什么都变了可以[01:25.20]让所有流星随时都相依[01:30.91]从此在人世上面没有无奈的分离[01:36.47]我不用睁着眼睛看你远走的背影[01:42.31]没有变坏的心情 没有失落的爱情[01:47.99]所有承诺永恒得像星星[02:19.75]谁能告诉我 有没有这样的笔[02:25.03]能画出一双双 不流泪的眼睛[02:31.10]留得住世上 一纵即逝的光阴[02:36.53]能让所有美丽 从此也不再凋零[02:42.38]如果是这样 我可以安慰自己[02:47.82]在没有你的夜里 能画出一线光明[02:53.85]留得住快乐 全部都送去给你[02:59.20]苦涩的味道变了甜蜜[03:04.85]从此也不用分开相爱的天和地[03:10.51]还能在冬雨天空月亮太阳再相遇[03:16.23]生命中只要有你 什么都变了可以[03:21.95]让所有流星随时都相遇[03:27.47]从此在人世上面没有无奈的分离[03:33.30]我不用睁着眼睛看你远走的背影[03:39.16]没有变坏的心情 没有失落的爱情[03:44.69]所有承诺永恒得像星星"
		},
		{
			name:"我们不该这样的",
			author:"张赫宣",
			src:"张赫宣 - 我们不该这样的.mp3",
			sq:"&#xe605;",
			content:"[00:00.37]张赫宣 - 我们不该这样的[00:04.74]（《北上广不相信眼泪》）[00:10.83]词：浅紫[00:13.12]曲：都智文[00:20.49]对不起我有些累了[00:24.85]我问我们都怎么了[00:29.58]再不像棋逢对手般[00:33.83]哪怕爱着恨着或酸着[00:38.05]突然有了很多心得[00:42.98]但却痛到不能选择[00:48.10]好多事我们都错了[00:56.69]我们不该这样的放手不爱了[01:01.16]我们怎么被动的苦笑着[01:05.07]不管对的错的[01:07.81]至少最后现实都输了[01:12.64]假想的竞争者[01:14.67]我们不该这样的[01:17.21]放手不爱了[01:19.34]我们怎么爱着却不快乐[01:23.86]抱歉我浪费了[01:26.09]可以更幸福的资格[01:33.56]也许真的是太爱了[01:37.82]愤怒也是因为忐忑[01:42.85]每当谁怪谁太苛刻[01:46.76]我们却又不懂得自责[01:51.43]好几次也都想算了[01:55.95]可心还会狠狠地疼着[02:01.28]想体谅你却更难过[02:07.58]Oh no[02:09.77]我们不该这样的放手不爱了[02:14.29]我们怎么被动的苦笑着[02:18.30]不管对的错的[02:20.94]至少最后现实都输了[02:25.76]假想的竞争者[02:27.80]我们不该这样的[02:30.34]放手不爱了[02:32.47]我们怎么爱着却不快乐[02:37.04]抱歉我浪费了[02:39.17]可以更幸福的资[02:46.38]我们怎么我们怎么[02:50.60]我们怎么被动的苦笑着[02:55.37]不管对的错的[02:57.50]至少最后现实都输了[03:02.28]假想的竞争者[03:04.77]我们不该这样的[03:06.95]放手不爱了[03:09.08]我们怎么爱着却不快乐[03:13.50]抱歉我浪费了[03:15.89]可以更幸福的资格[03:32.39]我浪费了更幸福的资格"
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
	$(audio).on("loadstart",function(){
		$(".lyric2").empty();
		$(".lyric2").css("top","0.6rem")
		lyric_ctrl();
		
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
	var tbul=$(".tubiao-main ul");
	var tbmain=$(".tubiao-main");
	var tbpos;
	$(".tubiao-main").on("touchstart","ul",function(e){
		tbpos=e.originalEvent.changedTouches[0].clientX;
		return false;
	})
	$(".tubiao-main").on("touchend","ul",function(e){
		var tbendpos=e.originalEvent.changedTouches[0].clientX;
		if(tbendpos-tbpos>50&&tbul.attr("data-t")){
			tbul.removeClass().addClass("tubiaor");
			tbul.removeAttr("data-t");
		}
		if(tbendpos-tbpos<-50){
			tbul.removeClass().addClass("tubiaol");
			tbul.attr("data-t","a");
		}
		return false;
	})
	var tbul1=$(".tubiao-main1 ul");
	var tbmain1=$(".tubiao-main1");
	var tbpos1;
	$(".tubiao-main1").on("touchstart","ul",function(e){
		tbpos1=e.originalEvent.changedTouches[0].clientX;
		return false;
	})
	$(".tubiao-main1").on("touchend","ul",function(e){
		var tbendpos1=e.originalEvent.changedTouches[0].clientX;
		if(tbendpos1-tbpos1>50&&tbul1.attr("data-t")){
			tbul1.removeClass().addClass("tubiaor");
			tbul1.removeAttr("data-t");
		}
		if(tbendpos1-tbpos1<-50){
			tbul1.removeClass().addClass("tubiaol");
			tbul1.attr("data-t","a");
		}
		return false;
	})
//歌词界面开关
	$("#h-right1").on("touchend",function(){
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
//歌词运动
		function lyric_ctrl()
		{
			var lyricObj=musics[currentIndex].content;
			var temp=lyricObj.split("[");
			var html1="";
			for(var i=0;i<temp.length;i++)
			{   
				var arr=temp[i].split("]");
				var text=(arr[1]);
				var time=arr[0].split(",");
				var temp2=time[0].split(".");
				var ms=temp2[1];//毫秒
				var temp3=temp2[0].split(":");			
				var s=temp3[1];//秒
				var m=temp3[0];//分
				var s_sum=parseInt(m*60)+parseInt(s);
				if(text)
				{
					html1+="<p id='lyric"+s_sum+"'>"+text+"</p>";
				}	
			}
			
			$(".lyric2").html(html1)
		}
		
	
	function play2(obj){
		var lyrict1="lyric"+(Math.floor(audio.currentTime)+2);
		var p1=$(".lyric2 p")
		for(var i=0;i<p1.length;i++){
			if(lyrict1==p1.eq(i).attr("id")){
				p1.css("color","#a7a1a1")
				p1.eq(i).css("color","#da254b");
				$(".lyric2").animate({"top":-i*0.6+0.6+"rem"},1000)
			}
		}
	}

})