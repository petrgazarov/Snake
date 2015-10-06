(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }

  var Board = SGame.Board = function() {
    this.snake = new SGame.Snake();
    this.dimensions = [20, 20];
    this.generateApple();
    this.render();
  }

  Board.prototype.render = function() {
    var grid = [];

    for (var i = 0; i < this.dimensions[0]; i++) {
      for (var j = 0; j < this.dimensions[1]; j++) {
        if (this.isSnake([i, j])) {
          var cell = $("<div>");
          cell.addClass('snake');
          grid.push(cell);
        }
        else if (this.isApple([i, j])) {
          var cell = $("<div>");
          cell.addClass('apple');
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
    if (this.snakeAteApple()) {
      this.snake.ateApple();
      this.snake.grow();
      this.generateApple();
    }
  }

  Board.prototype.snakeAteApple = function() {
    var apple = this.apple.position,
        secondSegm = this.snake.segments[1];
    return (secondSegm[0] === apple[0] && secondSegm[1] === apple[1]);
  }

  Board.prototype.checkIfLost = function() {
    var dir = this.snake.dir,
        dim = this.dimensions,
        head = this.snake.head();
    if (
      // check if hit the border
      (head[0] === dim[0] - 1 && dir === "S") ||
      (head[0] === 0 && dir === "N")          ||
      (head[1] === dim[1] - 1 && dir === "E") ||
      (head[1] === 0 && dir === "W")          ||
      // check if hit self
      (dir === "N" && this.isSnake([head[0] - 1, head[1]])) ||
      (dir === "S" && this.isSnake([head[0] + 1, head[1]])) ||
      (dir === "W" && this.isSnake([head[0], head[1] - 1])) ||
      (dir === "E" && this.isSnake([head[0], head[1] + 1]))
    ) {
      return true;
    }
  }

  Board.prototype.isSnake = function(position) {
    var result;
    this.snake.segments.forEach(function(segment) {
      if (segment[0] === position[0] && segment[1] === position[1]) {
        result = true;
        return;
      }
    });

    return result || false;
  }

  Board.prototype.generateApple = function() {
    this.apple = new SGame.Apple();
  }

  Board.prototype.isApple = function(position) {
    return (this.apple.position[0] === position[0] &&
            this.apple.position[1] === position[1])
  }
})();
