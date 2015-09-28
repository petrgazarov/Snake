(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }

  var Board = SGame.Board = function() {
    this.snake = new SGame.Snake();
    this.dimensions = [20, 20];
    this.grid = [];
    for (var i = 0; i < this.dimensions[0]; i++) {
      this.grid.push([]);
    }
    this.render();
  }

  Board.prototype.render = function() {
    for (var i = 0; i < this.dimensions[0]; i++) {
      for (var j = 0; j < this.dimensions[1]; j++) {
        if (this.snake.isSnake([i, j])) {
          this.grid[i].push(".");
        }
        else {
          this.grid[i].push('S');
        }
      }
    }
    return this.grid;
  }

  Board.prototype.turnSnake = function(dir) {
    this.snake.turn(dir);
  }

  Board.prototype.moveSnake = function() {
    this.snake.move();
  }
})();
