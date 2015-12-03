var assert = require('assert');
var main = require('../app.js');

describe('Avoid Bubble', function(){
  describe('function', function(){
	it('doesnt play the game,time would not count', function(){
      assert.equal('20',main.timerecord(0,20));
    })
	it('should can count the time', function(){
      assert.equal('21',main.timerecord(1,20));
    })
	it('doesnt start the game', function(){
      assert.equal('0',main.judge(0,0,150,250,150,250,20,150,250,20));
    })
	it('doesnt touch the green ball->continue', function(){
      assert.equal('1',main.judge(1,0,150,250,100,100,20,100,100,20));
    })
	it('touch the green ball->gameover', function(){
      assert.equal('2',main.judge(1,0,150,250,150,250,20,100,100,20));
    })
	it('touch the blue ball->special mode(=1)', function(){
      assert.equal('2',main.judge(1,0,150,250,100,100,20,150,250,20));
    })
	it('touch the green and blue ball->gameover', function(){
      assert.equal('3',main.judge(1,0,150,250,150,250,20,150,250,20));
    })
	it('doesnt start the game', function(){
      assert.equal('0',main.draw_blue_bubble(0,0,0,0));
    })
	it('blue ball will run', function(){
      assert.equal('22',main.draw_blue_bubble(1,100,20,9));
    })
	it('blue ball will start over', function(){
      assert.equal('0',main.draw_blue_bubble(1,100,815,9));
    })
	it('blue ball wont start over,because time', function(){
      assert.equal('817',main.draw_blue_bubble(1,100,815,15));
    })
	
  })
})
