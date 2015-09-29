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


  }

  View.prototype.handleKeyEvent = function(e) {
    switch(e.which) {
      case 37:
      case 65:
        this.board.turnSnake("W");
      break;

      case 38:
      case 87:
        this.board.turnSnake("N");
      break;

      case 39:
      case 68:
        this.board.turnSnake("E");
      break;

      case 40:
      case 83:
        this.board.turnSnake("S");
      break;

      case 32: this.startGame();;
      break;

      default: return;
    }
    e.preventDefault();
  }

  View.prototype.startGame = function() {
    if (!this.intervalId) {
      this.intervalId = window.setInterval(this.step.bind(this), 130);
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
  }
})();
