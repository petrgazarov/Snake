(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }

  var Snake = SGame.Snake = function() {
    this.dir = "E",
    this.segments = [[10, 10]]
  }

  Snake.prototype.move = function() {
    var that = this;

    if (this.dir === "N") {
      var newCoord = [- 1, 0];
    }
    else if (this.dir === "E") {
      var newCoord = [0, 1];
    }
    else if (this.dir === "S") {
      var newCoord = [1, 0];
    }
    else if (this.dir === "W") {
      var newCoord = [0, - 1];
    }

    this.changeSegments(newCoord);
  }

  Snake.prototype.changeSegments = function(newCoord) {
    for (var i = 0; i < this.segments.length; i++) {
      this.segments[i] = [
          this.segments[i][0] + newCoord[0], this.segments[i][1] + newCoord[1]
        ];
    }
  }

  Snake.prototype.isSnake = function(position) {
    var result;
    this.segments.forEach(function(segment) {
      if (segment[0] === position[0] && segment[1] === position[1]) {
        result = true;
      }
      else {
        result = false;
      }
    });
    return result;
  }

  Snake.prototype.head = function() {
    return this.segments[0];
  }

  Snake.prototype.turn = function(newDir) {
    this.dir = newDir;
  }
})();
