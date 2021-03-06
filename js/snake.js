(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }

  var Snake = SGame.Snake = function() {
    this.dir = "E",
    this.segments = [[0, 2], [0, 1], [0, 0]],
    this.eatenAppleIndices = [];
  }

  Snake.prototype.move = function() {
    var that = this;

    if (this.dir === "N") {
      var newCoord = [-1, 0];
    }
    else if (this.dir === "E") {
      var newCoord = [0, 1];
    }
    else if (this.dir === "S") {
      var newCoord = [1, 0];
    }
    else if (this.dir === "W") {
      var newCoord = [0, -1];
    }

    this.changeSegments(newCoord);
  }

  Snake.prototype.changeSegments = function(newCoord) {
    var lastSegm = this.segments[this.segments.length - 1];

    for (var i = this.segments.length - 1; i > 0; i--) {
      this.segments[i] = this.segments[i - 1];
    }
    if (this.addSegment) {
      this.segments.push(lastSegm);
      this.addSegment = false;
    }

    this.segments[0] = [
        this.segments[0][0] + newCoord[0], this.segments[0][1] + newCoord[1]
      ];

    for (var i = 0; i < this.eatenAppleIndices.length; i++) {
      if (this.eatenAppleIndices[i] < this.segments.length - 1) {
        this.eatenAppleIndices[i]++;
      }
      else {
        this.eatenAppleIndices.pop();
      }
    }
  }

  Snake.prototype.head = function() {
    return this.segments[0];
  }

  Snake.prototype.turn = function(newDir) {
    if (this.isOpposite(newDir)) {
      return;
    } else {
      this.dir = newDir;
    }
  }

  Snake.prototype.ateApple = function() {
    this.grow();
  }

  Snake.prototype.willEatApple = function() {
    this.eatenAppleIndices.unshift(-1);
  }

  Snake.prototype.grow = function() {
    this.addSegment = true;
  }

  Snake.prototype.isOpposite = function(newDir) {
    return SGame.Coord.isOpposite(this.dir, newDir);
  }

  Snake.prototype.isEatenApple = function(position) {
    var result;

    if (this.eatenAppleIndices.length > 0) {
      this.eatenAppleIndices.forEach(function(idx) {
        if (position[0] === this.segments[idx][0] &&
            position[1] === this.segments[idx][1]
           ) {
          result = true;
          return;
        }
      }.bind(this));
    }

    return (result || false);
  }
})();
