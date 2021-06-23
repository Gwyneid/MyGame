var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = 1000;
var screenlength = window.innerWidth;

document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);
document.addEventListener("keydown",keyDownStart, false);
document.addEventListener("keydown",move, false);
document.addEventListener("keyup",stopMove, false);
document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("touchstart", touchTrue, false);
document.addEventListener("touchmove", touchMove, false);
document.addEventListener("touchcancel", touchFalse, false);
