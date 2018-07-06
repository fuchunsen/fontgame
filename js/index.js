window.onload = function(){
// 加载进度条
var loading = document.querySelector(".loadingBox .panel .tiao .jindu");
var font = document.querySelector(".loadingBox .panel .tiao p .zi");
var loadingBox = document.querySelector(".loadingBox");
var lifeNum = document.querySelector(".playBox .playTop .playLeft .lifeNum");
var nlifeNum = document.querySelector(".nextBox .nextTop .nextLeft .lifeNum");
var scoreNum = document.querySelector(".playBox .playTop .playRight .scoreNum");
var nscoreNum = document.querySelector(".nextBox .nextTop .nextRight .scoreNum");
var img = document.querySelectorAll(".startBox .center img");
var startBox = document.querySelector(".startBox");
var invoice = document.querySelectorAll(".playBox .voice .inVoice");
var charObj = {};
var main = document.querySelector(".playBox .main");
var playBox = document.querySelector(".playBox");
var win = document.querySelector(".nextBox .win");
var lose = document.querySelector(".nextBox .lose");
var nextBtn = document.querySelector(".nextBox .win .nextBtn");
var replay = document.querySelector(".nextBox .lose .replay");
var set = document.querySelector(".nextBox .set .setImg");
var setDel = document.querySelector(".nextBox .set .setDel");
var sound = document.querySelector(".nextBox .set .setDel img:nth-child(1)");
var music = document.querySelector(".nextBox .set .setDel img:nth-child(2)");
var disas = document.querySelector(".nextBox .set .setDel img:nth-child(3)");
var disam = document.querySelector(".nextBox .set .setDel img:nth-child(4)");
var audio = document.querySelector("audio");
var num = 3; //同时下落三个字母
var speed = 5; //每10ms下落速度
var life = 100; //生命值
var score = 0; //分数
var w = 0;
var t = setInterval(function(){
	w += 2;
	if(w >= 100){
		w = 100;
		loadingBox.style.transform = "translate3d(0,-100%,0)";
	}
	loading.style.width = w + "%";
	font.innerHTML = w;
},100)
// 欢迎页动效
setTimeout(function(){
	animate(img[0],{top:-200},500);
	animate(img[2],{left:-130},500);
	animate(img[4],{right:40,top:50},500);
},7000)
var tiaodong1 = function(){
	animate(img[1],{transform:"translate3d(-10%,-8%,0) scale(1.4)"},800,function(){
		animate(img[1],{transform:"translate3d(0,0,0) scale(1)"},800,function(){
			tiaodong1();
		})
	})
}
var tiaodong2 = function(){
	animate(img[3],{transform:"translate3d(10%,8%,0) scale(1.3)"},1500,function(){
		animate(img[3],{transform:"translate3d(0,0,0) scale(1)"},1500,function(){
			tiaodong2();
		})
	})
}
tiaodong1();
tiaodong2();
var huxi1 = function(){
	animate(img[5],{transform:"translate3d(-50%,0,0) scale(1.3)"},400,function(){
		animate(img[5],{transform:"translate3d(-50%,0,0) scale(1)"},400,function(){
			huxi1();
		})
	})
}
var huxi2 = function(){
	animate(nextBtn,{transform:"translate3d(-90%,0,0) scale(1.3)"},400,function(){
		animate(nextBtn,{transform:"translate3d(-90%,0,0) scale(1)"},400,function(){
			huxi2();
		})
	})
}
var huxi3 = function(){
	animate(replay,{transform:"translate3d(-90%,0,0) scale(1.3)"},400,function(){
		animate(replay,{transform:"translate3d(-90%,0,0) scale(1)"},400,function(){
			huxi3();
		})
	})
}
huxi1();
huxi2();
huxi3();
img[5].onclick = function(){
	startBox.style.transform = "translate3d(0,-100%,0)";
	setTimeout(move,3000);
}
// 游戏中声音开关
invoice[0].onclick = function(){
	invoice[0].className = "inVoice";
	invoice[1].className = "inVoice tVoice";
	disam.style.display = "block";
	audio.pause();
}
invoice[1].onclick = function(){
	invoice[1].className = "inVoice";
	invoice[0].className = "inVoice tVoice";
	disam.style.display = "none";
	audio.play();
}
// 产生随机字母
function char(){
	do{
		var charNum = Math.floor(Math.random()*26+65);
		var charFon = String.fromCharCode(charNum);
	}while(charObj[charFon]);
	charObj[charFon] = true;
	var item = document.createElement("img");
	item.src = "img/"+charFon+".png";
	item.className = "picture";
	item.type = charFon;
	main.appendChild(item);
	var l = Math.random()*(main.offsetWidth-item.offsetWidth);
	var h = -(Math.random()*170+80);
	item.style.left = l+"px";
	item.style.top = h+"px";
}
// 字母下移
var moveT;
function move(){
	moveT = setInterval(function(){
		var items = document.querySelectorAll(".playBox .main .picture");
		if(items.length < num){
			char();
		}
		items.forEach(function(val,i){
			var top = val.offsetTop;
			val.style.top = top+speed+"px";
			if(val.offsetTop >= main.offsetHeight-val.offsetHeight){
				let which = val.type;
				main.removeChild(val);
				delete charObj[which];
				life -= 10;
			}
		})
		lifeNum.style.width = life+"%";
		nlifeNum.style.width = life+"%";
		if(life <= 0){
			win.style.display = "none";
			lose.style.display = "block";
			playBox.style.transform = "translate3d(0,-100%,0)";
			clearInterval(moveT);
			rePlay();
		}
	},80)
}
for(let i = 0 ; i < num ; i++){
	char();
}
window.onkeydown = function(e){
	let compear = String.fromCharCode(e.keyCode||e.which);
	var items = document.querySelectorAll(".playBox .main .picture");
	var flag = 0;
	for(let i = 0 ; i < items.length ; i++){
		if(items[i].type == compear){
			main.removeChild(items[i]);
			delete charObj[compear];
			score++;
			flag = 1;
		}
	}
	if(flag != 1){
		life -= 10;
	}
	scoreNum.innerHTML = score;
	nscoreNum.innerHTML = score;
	if(score%30 == 0 && score != 0){
		win.style.display = "block";
		lose.style.display = "none";
		playBox.style.transform = "translate3d(0,-100%,0)";
		clearInterval(moveT);
		nextPlay(); //下一关
	}
}
function nextPlay(){
	nextBtn.onclick = function(){
		playBox.style.transform = "";
		var items = document.querySelectorAll(".playBox .main .picture");
		for(let i = 0 ; i < items.length ; i++){
			main.removeChild(items[i]);
		}
		num++;
		speed += 2;
		charObj = {};
		score = 0;
		life = 100;
		lifeNum.style.width = life+"%";
		scoreNum.innerHTML = score;
		setTimeout(move,3000);
	}
}
function rePlay(){
	replay.onclick = function(){
		playBox.style.transform = "";
		var items = document.querySelectorAll(".playBox .main .picture");
		items.forEach(function(val,i){
			main.removeChild(val);
		})
		num = 3;
		speed = 5;
		life = 100;
		score = 0;
		charObj = {};
		for(let i = 0 ; i < num ; i++){
			char();
		}
		lifeNum.style.width = life+"%";
		scoreNum.innerHTML = score;
		setTimeout(move,3000);
	}
}
var setTimes = 0;
set.onclick = function(){
	if(setTimes == 0){
		setDel.style.height = "170px";
		setDel.style.border = "2px solid #5d8597";
		setTimes++;
	}else{
		setDel.style.height = "";
		setDel.style.border = "";
		setTimes--;
	}
}
sound.onclick = function(){
	disas.style.display = "block";
}
music.onclick = function(){
	disam.style.display = "block";
	invoice[0].className = "inVoice";
	invoice[1].className = "inVoice tVoice";
	audio.pause();
}
disas.onclick = function(){
	disas.style.display = "none";
}
disam.onclick = function(){
	disam.style.display = "none";
	invoice[1].className = "inVoice";
	invoice[0].className = "inVoice tVoice";
	audio.play();
}
}