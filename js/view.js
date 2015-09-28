(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }

  var View = SGame.View = function(selector) {
    this.$el = $(selector);
    this.board = new SGame.Board();

    this.$el.keydown(function(e) {
      this.handleKeyEvent(e);
    }.bind(this));
    window.setInterval(this.step.bind(this), 500);
  }

  View.prototype.handleKeyEvent = function() {
    switch(e.which) {
      case 37: this.board.turnSnake("W");
      break;

      case 38: this.board.turnSnake("N");
      break;

      case 39: this.board.turnSnake("E");
      break;

      case 40: this.board.turnSnake("S");
      break;

      default: return;
    }
    e.preventDefault();
  }

  View.prototype.step = function() {
    this.board.moveSnake();
  this.$el.html(this.board.render());
  }
})();