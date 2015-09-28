(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }

  var View = SGame.View = function(element) {
    this.$el = element;
    this.board = new SGame.Board();
  }
}
