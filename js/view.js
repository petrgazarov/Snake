(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }

  var View = SGame.View = function(selector) {
    this.$el = $(selector);
    this.board = new SGame.Board();

    $('html').keydown(function(e) {
      this.handleKeyEvent(e);
    }.bind(this));

    this.interval = 130;
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
      this.intervalId = window.setInterval(this.step.bind(this), this.interval);
    }
  }

  View.prototype.gameOver = function() {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
  }

  View.prototype.step = function() {
    if (this.board.checkIfLost()) {
      this.gameOver();
      return;
    }
    this.board.moveSnake();
    var grid = this.board.render();
    this.$el.html(this.board.render());

    this.stepping = false;
  }
})();
