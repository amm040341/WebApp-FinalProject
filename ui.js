window.addEventListener("load", function() {
		Bubble();
		
		if(flag==0){
		ctx.fillStyle="#FFCCCC";
		ctx.beginPath();
		ctx.arc(150,300,20,0,Math.PI*2,true);//(x,y,半徑)
		ctx.closePath();
		ctx.fill();

		ctx.textAlign="center";
		ctx.fillStyle="#888888";
		ctx.font="40px Georgia";
		ctx.fillText("START",150,250);
		ctx.font="20px Georgia";
		ctx.fillText("You can't touch the green bubble,",150,120);
		ctx.fillText("but you can touch the blue one.",150,140);
		ctx.fillText("(can lower the speed)",150,160);
		ctx.fillText("Good Luck!",150,180);
	}
});

//將touchmove及mousedown宣告為touchmove和touchdown
var mouseEventTypes = {
touchstart : "mousedown",
touchmove : "mousemove",
touchend : "mouseup"
};

for (originalType in mouseEventTypes) {
document.addEventListener(originalType, function(originalEvent) {
event = document.createEvent("MouseEvents");
touch = originalEvent.changedTouches[0];
event.initMouseEvent(mouseEventTypes[originalEvent.type], true, true,
window, 0, touch.screenX, touch.screenY, touch.clientX,
touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey,
touch.metaKey, 0, null);
originalEvent.target.dispatchEvent(event);
});
}

var flag = 0;//flag 0:遊戲起始畫面;flag 1:遊戲中;flag 2:遊戲結束
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

