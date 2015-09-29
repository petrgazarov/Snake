(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }

  var Snake = SGame.Snake = function() {
    this.dir = "E",
    this.segments = [[0, 2], [0, 1], [0, 0]]
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
    for (var i = 0; i < this.segments.length; i++) {
      this.segments[i] = [
          this.segments[i][0] + newCoord[0], this.segments[i][1] + newCoord[1]
        ];
    }
  }

  Snake.prototype.head = function() {
    return this.segments[0];
  }

  Snake.prototype.turn = function(newDir) {
    this.dir = newDir;
  }

  Snake.prototype.grow = function() {

  }
})();
