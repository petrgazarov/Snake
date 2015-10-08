(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }

  var View = SGame.View = function(selector) {
    this.currentScore = 0;
    this.gamesPlayed = 0;
    this.$el = $(selector);
    this.board = new SGame.Board();
    this.nextRoundModal = false;

    $('html').keydown(function(e) {
      this.handleKeyEvent(e);
    }.bind(this));
  }

  View.prototype.handleKeyEvent = function(e) {
    e.preventDefault();

    switch(e.which) {
      case 37:
      case 65:
        this.passTurn("W");
      break;

      case 38:
      case 87:
        this.passTurn("N");
      break;

      case 39:
      case 68:
        this.passTurn("E");
      break;

      case 40:
      case 83:
        this.passTurn("S");
      break;

      case 32: this.startGame();;
      break;

      default: return;
    }
  }

  View.prototype.passTurn = function(dir) {
    if (this.stepping) {
      window.setTimeout(this.board.turnSnake.bind(this.board, dir), this.interval);
      return;
    }

    this.stepping = true;
    this.board.turnSnake(dir);
  }

  View.prototype.startGame = function() {
    if (!this.intervalId) {
      this.interval = 140;
      this.round = 0;
      this.setUpForNewGame();
      this.board = new SGame.Board();
      this.firstStep();
      this.intervalId = window.setInterval(this.step.bind(this), this.interval);
    }
  }

  View.prototype.gameOver = function() {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
      this.borderRed();
      $('#board').append($('<h3>').addClass('game-status')
                 .text('GAME OVER').css('font-size', '36px'));
  }

  View.prototype.step = function() {
    if (this.board.checkIfLost()) {
      this.gameOver();
      return;
    }

    if (this.board.snakeWillEatApple()) {
      this.updateScore(false);
      this.borderGreen();
      window.setTimeout(this.borderBlack.bind(this), 250);
      this.incrementRoundIfHit20();
    }
    this.board.moveSnake();
    var grid = this.board.render();
    this.$el.html(this.board.render());
    if (this.nextRoundModal) { this.showNextRoundModal(); }

    this.stepping = false;
  }

  View.prototype.firstStep = function() {
    this.borderBlack();
    this.step();
  }

  View.prototype.borderGreen = function() {
    this.$el.css('border', '5px solid green')
  }

  View.prototype.borderBlack = function() {
    this.$el.css('border', '5px solid black')
  }

  View.prototype.borderRed = function() {
    this.$el.css('border', '5px solid red')
  }

  View.prototype.updateScore = function(reset) {
    reset ? (this.currentScore = 0) : this.currentScore++;
    $('.current-score').text(this.stringify(this.currentScore));
  }

  View.prototype.setUpForNewGame = function() {
    $('.games-played').text(this.stringify(this.gamesPlayed));
    this.gamesPlayed++;
    this.updateScore(true);
  }

  View.prototype.incrementRoundIfHit20 = function() {
    if (this.currentScore % 20 === 0 && this.currentScore !== 0) {
      this.round++;
      this.resetInterval(30);
      this.showNextRoundModal(true);
    }
  }

  View.prototype.resetInterval = function(unitsFaster) {
    window.clearInterval(this.intervalId);
    this.intervalId = window.setInterval(this.step.bind(this), this.interval -= unitsFaster);
  }

  View.prototype.showNextRoundModal = function(initial) {
    if (initial) {
      this.nextRoundModal = true;
      window.setTimeout(function() {
        this.nextRoundModal = false;
      }.bind(this), 5000);
    }

    $('#board').append($('<h3>').addClass('game-status')
               .text('TURBO '+ this.round).css('font-size', '36px'));
  }

  View.prototype.stringify = function(number) {
    numString = number.toString();
    return (numString.length == 2 ? numString : "0" + numString)
  }
})();
