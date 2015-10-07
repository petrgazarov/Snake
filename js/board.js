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
        var cell = $("<div>");

        if (this.isSnake([i, j])) {
          cell.addClass('snake');

          if (this.isEatenApple([i, j])) {
            cell.addClass('eaten-apple')
          }
        }
        else if (this.isApple([i, j])) {
          cell.addClass('apple');
        }
        else {
          cell.addClass('space');
        }

        grid.push(cell);
      }
    }
    return grid;
  }

  Board.prototype.turnSnake = function(dir) {
    this.snake.turn(dir);
  }

  Board.prototype.moveSnake = function() {
    if (this.snakeWillEatApple()) {
      this.snake.willEatApple();
    }
    this.snake.move();
    if (this.snakeAteApple()) {
      this.snake.ateApple();
      this.generateApple();
    }
  }

  Board.prototype.snakeAteApple = function() {
    var apple = this.apple.position,
        secondSegm = this.snake.segments[1];
    return (secondSegm[0] === apple[0] && secondSegm[1] === apple[1]);
  }

  Board.prototype.snakeWillEatApple = function() {
    var apple = this.apple.position,
        head = this.snake.head();
        dir = this.snake.dir

    return  (dir === "S" && apple[1] === head[1] && head[0] === apple[0] - 1) ||
            (dir === "N" && apple[1] === head[1] && head[0] === apple[0] + 1) ||
            (dir === "E" && apple[0] === head[0] && head[1] === apple[1] - 1) ||
            (dir === "W" && apple[0] === head[0] && head[1] === apple[1] + 1)
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

  Board.prototype.isEatenApple = function(position) {
    return this.snake.isEatenApple(position);
  }

  Board.prototype.generateApple = function() {
    do
      this.apple = new SGame.Apple();
    while ((this.isSnake(this.apple.position)));
  }

  Board.prototype.isApple = function(position) {
    return (this.apple.position[0] === position[0] &&
            this.apple.position[1] === position[1])
  }
})();
