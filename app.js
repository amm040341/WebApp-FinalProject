var x = Math.random()*300;
var y = 0;
var size = 30;
var blue_x = Math.random()*300;
var blue_y = 0;
var blue_size = 20;
var special = 0;
var count = 0;
var second = 0;
var mouse_position_x;
var mouse_position_y;

Bubble = function(){
		setInterval(draw_bubble,1);
		setInterval(draw_blue_bubble,1);
		setInterval(clean_bubble,15);
		setInterval(judge,1);
		setInterval(timerecord,1000);//一秒更新一次
}

draw_bubble = function(){

	if (this.flag == 1){
		if (special == 1){//減速模式
			y = y + 0.5;
			count = count+1;
			ctx.rect(0,0,300,500);
			ctx.fillStyle="#5599FF";
			ctx.fill();

		if(count ==300){
			special = 0;
			count = 0;
		}
	}else{
		if (second < 10){
			y = y + 1;
		}
		else if(second<20){
			y = y + 1.5;
		}
		else if(second<30){
			y = y + 2;
		}
		else if(second<40){
			y = y + 2.5;
		}
		else if(second<50){
			y = y + 3;
		}else{
			y = y + 3;
		}
	}

		if ( y > 500 )
		{
			x = Math.random()*300;
			y = 0;
			size = Math.random()*80;
			if(size<20){
				size = size + 20;
			}
		}
		ctx.fillStyle="#DDFF77";
		ctx.beginPath();
		ctx.arc(x,y,size,0,Math.PI*2,true);//(x,y,半徑)
		ctx.closePath();
		ctx.fill();
	}
	if( this.flag == 2 || second>=60){
		ctx.clearRect(0,0,300,500);
		ctx.fillStyle="#888888";
		ctx.font="40px Georgia";
		if(this.flag == 2 && second<60){
			ctx.fillText("Game Over!!",150,200);
			ctx.fillText("紀錄:"+second+"秒",150,250);
			ctx.fillText("Restart",150,300);
		}else{
			this.flag = 2;
			ctx.fillText("You Win!!!",40,200);
		}
	}
}

draw_blue_bubble = function(f,bx,by,s){
	if(this.flag==1){
		blue_y = blue_y + 2;
		if ( second%9 == 0 && blue_y > 800 )
		{
			blue_x = Math.random()*300;
			blue_y = 0;
		}

		ctx.fillStyle="#99FFFF";
		ctx.beginPath();
		ctx.arc(blue_x,blue_y,blue_size,0,Math.PI*2,true);//(x,y,半徑)
		ctx.closePath();
		ctx.fill();
	}
	//for test
	if(f==1){
		by = by + 2;
		if ( s%9 == 0 && by > 800 )
		{
			bx = Math.random()*300;
			by = 0;
		}
		//draw blue ball
	}
	return by;
}

clean_bubble = function(){
	if( this.flag == 1){
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0,0,300,500);

		//為解決閃頻問題，在清空當下，再畫一次物件
		if (special == 1){
			ctx.rect(0,0,300,500);
			ctx.fillStyle="#5599FF";
			ctx.fill();
		}

		draw_bubble();
		draw_blue_bubble();

		ctx.fillStyle="#FFCCCC";
		ctx.beginPath();
		ctx.arc(mouse_position_x-10,mouse_position_y-10,20,0,Math.PI*2,true);//(x,y,半徑)
		ctx.closePath();
		ctx.fill();
	}
}

judge = function(f,spe,mx,my,xx,yy,s,bxx,byy,bs){
	if(this.flag==1){
		if( mouse_position_x > x-size &&
			mouse_position_x < x+size &&
			mouse_position_y > y-size &&
			mouse_position_y < y+size){
			this.flag = 2;
		}
		if( mouse_position_x > blue_x-blue_size &&
			mouse_position_x < blue_x+blue_size &&
			mouse_position_y > blue_y-blue_size &&
			mouse_position_y < blue_y+blue_size){
			special = 1;
		}
	}

	//for test
	if(f==1){
		if( mx > xx-s &&
			mx < xx+s &&
			my > yy-s &&
			my < yy+s){
			f = 2;
		}
		if( mx > bxx-bs &&
			mx < bxx+bs &&
			my > byy-bs &&
			my < byy+bs){
			spe = 1;
		}
	}
	return f+spe
}

timerecord = function(f,x){
	if (this.flag==1){
		second = second + 1;	
	}

	//for test
	if(f==1){
		x=x+1;
	}
	return x;
}

function mousemove(e) {
    mouse_position_x = e.clientX;
    mouse_position_y = e.clientY;

	//畫角色
	if(flag==1){
		ctx.fillStyle="#FFCCCC";
		ctx.beginPath();
		ctx.arc(mouse_position_x-10,mouse_position_y-10,20,0,Math.PI*2,true);//(x,y,半徑)
		ctx.closePath();
		ctx.fill();
		}
 }

function mousedownhandler(e){//開始
	if(flag==0 ||flag==2){
		flag = 1;
		second = 0;
		size = 30;
		y = 0;
	}
}

module.exports.draw_blue_bubble = draw_blue_bubble;
module.exports.judge = judge;
module.exports.timerecord = timerecord;
