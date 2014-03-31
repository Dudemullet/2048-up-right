function start(){

var
  dispatcher = document.getElementsByTagName('body')[0],
  fails = 0,
  gameOverWatcher = 0;

dispatcher.addEventListener('transitionend', function(){
  fails = fails==1?1:0;
  gameOverWatcher = 0;
});

var determineMove = function() {
  if(fails < 2)
    upOrRight();
  else
    moveLeft();

  if(gameOverWatcher <= 3)  
    window.setTimeout(determineMove, 200);
  else {
    gameFinished();
  }
};

var gameFinished = function() {
  document.querySelectorAll('.score-sharing')[0].children[0].remove();

  var 
    tweet = document.createElement('a'),
    score = parseInt(document.querySelector('.score-container').textContent, 10)
    text = 'I scored ' + score + ' points at 2048 cheating with http://bit.ly/1gQ3JL5, ' + 
      '#2048game #cheat2048';
  tweet.classList.add('twitter-share-button');
  tweet.setAttribute('href', 'https://twitter.com/share');
  tweet.setAttribute('data-via', 'gabrielecirulli');
  tweet.setAttribute('data-url', 'http://git.io/2048');
  tweet.setAttribute('data-counturl', 'http://gabrielecirulli.github.io/2048/');
  tweet.textContent = 'Tweet';
  tweet.setAttribute('data-text', text);

  document.querySelectorAll('.score-sharing')[0].appendChild(tweet);
  twttr.widgets.load();
}

var upOrRight = function() {
  if(fails == 0) {
    board.moveUp();
  }
  else {
    board.moveRight();
  }
  fails++;
  gameOverWatcher++;
};

var moveLeft = function() {
  board.moveLeft();
  fails = 0;
  gameOverWatcher++;
};

var board = function() {
  var 
    up_evt = document.createEventObject?document.createEventObject() : document.createEvent('Events'),
    right_evt = document.createEventObject?document.createEventObject() : document.createEvent('Events'),
    left_evt = document.createEventObject?document.createEventObject() : document.createEvent('Events');

  up_evt.initEvent('keydown', true, true);
  right_evt.initEvent('keydown', true, true);
  left_evt.initEvent('keydown', true, true);

  up_evt.keyCode = 38;
  up_evt.which = 38;
  right_evt.keyCode = 39;
  right_evt.which = 39;
  left_evt.keyCode = 37;
  left_evt.which = 37;

  return {
    moveUp: function(){console.log('Up');return dispatcher.dispatchEvent(up_evt);},
    moveRight: function (){console.log('Right'); return dispatcher.dispatchEvent(right_evt);},
    moveLeft: function (){console.log('Left'); return dispatcher.dispatchEvent(left_evt); }
  };
};

var board = board();
determineMove();

};
start();
void(0);