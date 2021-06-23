var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = 1000;
var screenlength = window.innerWidth;
var indent = (screenlength-1000)/2;
var piece = canvas.height/8;
var x = canvas.width/2 - 75;
var y = canvas.height-140;
var dx = 30;
var dy = 3;
var clickX =0;
var clickY = 0;
var control =0;
var mousedown=false;
var up = false;
var down = false;
var left = false;
var right = false;
var fire = false;
var k = 0;
var start = 0;
var lose = 0;
var clean = 0;
var bossfightStart = 50;
var s = 0;
var border = 1;
var border2 = 0;
var s1 = 50;
var s2 = 800;
var s3 = 1;
var s4 = 1; 
var s5 = 0;
var s6 = 0;
var s7 = 0;
var shield = false;
var score = 0;
var scoreNow=0;
var bestScore = 0;
var version = 0;
var bossfight = 0;
var bulletWidth = 16;
var bulletHeight = 50;
var live =1;
var openMenu = true;
var back = new Image();
back.src = 'images/menu.jpg';
var space = new Image();
space.src = 'images/space.png';
var meteorite = new Image();
meteorite.src = 'images/meteorite.png';
var spaceship = new Image();
spaceship.src = 'images/spaceship.png';
var laser = new Image();
laser.src = 'images/laser.png';
var laser2 = new Image();
laser2.src = 'images/laser2.png';
var UFO = new Image();
UFO.src = 'images/UFO.png';
var Shield = new Image();
Shield .src = 'images/shield.png';
var boss = new Image();
boss.src = 'images/boss.png';
if(screenlength < 1000)
	indent = 0;	


document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);
document.addEventListener("keydown",keyDownStart, false);
document.addEventListener("keydown",move, false);
document.addEventListener("keyup",stopMove, false);
document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("touchstart", touchTrue, false);
document.addEventListener("touchmove", touchMove, false);
document.addEventListener("touchcancel", touchFalse, false);
  
function mouseDown(e){
	if(control!=2){
      mousedown = true;
	  control = 1;
	  if(screenlength < 1000)
	  indent = 0;
      fire = true;
	}
}

function mouseUp(e){
    mousedown = false;
}

function mouseMove(e){
    clickX = e.clientX;
    clickY = e.clientY;
}

function keyDownStart(e){
	if(e.keyCode == 32 && control!=1){
		control = 2;
        mousedown = true;
    }
}

function touchTrue(e){
    mousedown = true;
}
function touchFalse(e){
    mousedown = false;
}
function touchMove(e){
    clickX = e.targetTouches[0].pageX;
    clickY = e.targetTouches[0].pageY;
}

function move(e){
    if(e.keyCode == 38){
        up = true;
    }
    if(e.keyCode == 40){
        down = true;
    }
    if(e.keyCode == 37){
        left = true;
    }
    if(e.keyCode == 39){
        right = true;
    }
    if(e.keyCode == 32){
        fire = true;
    }
}

function stopMove(e){
    if(e.keyCode == 38){
        up = false;
    }
    if(e.keyCode == 40){
        down = false;
    }
    if(e.keyCode == 37){
        left = false;
    }
    if(e.keyCode == 39){
        right = false;
    }
    if(e.keyCode == 32){
        fire = false;
    }
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function Menu() {
	ctx.beginPath();
	ctx.drawImage(back, 0, 0, canvas.width, canvas.height);
    ctx.font = "50px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.font = "40px Arial";
	if(version==0){
       ctx.fillText("Нажмите  пробел чтобы играть с клавиатуры", 140, 60);
	   ctx.fillText("your best score: "+ bestScore, 350, 300);
       ctx.fillText("Или нажмите на экран чтобы играть c телефона", 20, 575);
	}
	if(version == 1){
	   ctx.fillText("Нажмите пробел чтобы выйти в меню", 10, 60);
	   ctx.fillText("или кликните по экрану", 520, 110);
	   ctx.fillText("your lose", 380, 250);
	   ctx.fillText("your score: "+ scoreNow, 350, 325);
	}
	ctx.closePath();
}

function Score() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score:" +score, 30, 60);
	s+=1;
	if(s % 100 == 0){
	score = score + 1;
	s=0;
	}
}

function drawHealth() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("health:" + player.gethealth()+"%", 800, 60);
	if(player.gethealth()<=0){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		mousedown = false;
		openMenu = true;
		ship.x = canvas.width/2 - 75;
		ship.y = canvas.height - 140;
		player.health= 100;
		if(score > bestScore)
			bestScore = score;
		scoreNow = score;
		score = 0;
		version = 1;
		shield = false;
		player.shield = false;
		fire = false;
		control = 0;
		border = 1;
		bossfightStart = 50;
		bossfight = 0;
		s2=800;
		s6 = 0;
		clean = 0;
		bullets.splice(0, bullets.length);
        obstacles.splice(0, obstacles.length);
		enemy.splice(0, enemy.length);
		if( bossfight == 1){
		   boooss.live = 0;
		}		
	}	
}

const bullets = [];
class Bullet {
   constructor(){
	  this.bulletWidth = 16;
      this.bulletHeight = 50;
	  this.hit = 1;
      this.x = ship.coordinate_x();
      this.y = ship.coordinate_y();
      bullets.push(this);
   }
   drawBulletShip(){
      this.y -= 2.5;
	  if(this.hit==1)
      ctx.drawImage(laser,this.x + 59, this.y - 35, this.bulletWidth, this.bulletHeight);
      if(this.y < -200)
		  bullets.splice(this,1);
	  if(this.y < 0)
		  this.hit = 0;
   }
}

const obstacles = [];
class Obstacle{
	constructor(){
	this.live = 1;
	this.x = getRandomInt(100, 900);
	this.y = getRandomInt(-100,-50);
	this.dx = getRandomFloat(-1.2, 1.2);
	this.dy = getRandomInt(3, 7);
	obstacles.push(this);
	}
	draw(){
		this.x += this.dx;
		this. y += this.dy;
		if(this.live == 1)
	    ctx.drawImage(meteorite, this.x , this.y , 100, 100);
		for(let i = 0; i < bullets.length; i++){ 
			if(bullets[i].x > this.x - 70 && bullets[i].x < this.x + bulletWidth + 35&& (bullets[i].y- this.y) <= 100)
				if( bullets[i].y > this.y + bulletHeight )
			      if( bullets[i].hit == 1 && this.live == 1){
				this.live = 0;
				bullets[i].hit=0;
			}
		}			
	}
	damage(){
		if(this.x + 100 >= ship.coordinate_x()+30 && this.x  <= ship.coordinate_x() + 90 && Math.abs(ship.coordinate_y()-this.y) <= 90 )
			if(this.live == 1){
			player.hit();
		    this.live=0;
			if(player.shield == false){
	            player.shield = true;
	            shield = true;
	           }
			}
	}
}
