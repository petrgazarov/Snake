(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }

  var View = SGame.View = function(element) {
    this.$el = element;
    this.board = new SGame.Board();

    this.$el.keydown(function(e) {
      this.handleKeyEvent(e);
    }
  }

  View.prototype.handleKeyEvent = function() {
    switch(e.which) {
        case 37: this.snake.turn("W");
        break;

        case 38: this.snake.turn("N");
        break;

        case 39: this.snake.turn("E");
        break;

        case 40: this.snake.turn("S");
        break;

        default: return;
    }
    e.preventDefault();
  }
});
