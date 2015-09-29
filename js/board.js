(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }

  var Board = SGame.Board = function() {
    this.snake = new SGame.Snake();
    this.dimensions = [20, 20];
    this.render();
  }

  Board.prototype.render = function() {
    var grid = [];

    for (var i = 0; i < this.dimensions[0]; i++) {
      for (var j = 0; j < this.dimensions[1]; j++) {
        if (this.snake.isSnake([i, j])) {
          var cell = $("<div>");
          cell.addClass('snake');
          grid.push(cell);
        }
        else {
          var cell = $("<div>");
          cell.addClass('space');
          grid.push(cell);
        }
      }
    }
    return grid;
  }

  Board.prototype.turnSnake = function(dir) {
    this.snake.turn(dir);
  }

  Board.prototype.moveSnake = function() {
    this.snake.move();
  }

  Board.prototype.checkIfLost = function() {
    var dir = this.snake.dir,
        dim = this.dimensions,
        head = this.snake.head();
    if (
      (head[0] === dim[0] - 1 && dir === "S") ||
      (head[0] === 0 && dir === "N") ||
      (head[1] === dim[1] - 1 && dir === "E") ||
      (head[1] === 0 && dir === "W")
    ) {
      alert("you lost!");
      return true;
    }
  }
})();
