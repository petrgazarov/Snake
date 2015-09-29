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
  }

  Snake.prototype.head = function() {
    return this.segments[0];
  }

  Snake.prototype.turn = function(newDir) {
    if (this.oppositeDirection(newDir)) {
      return;
    } else {
      this.dir = newDir;
    }
  }

  Snake.prototype.grow = function() {
    this.addSegment = true;
  }

  Snake.prototype.oppositeDirection = function(newDir) {
    var dir = this.dir;

    return (
      (dir === "N" && newDir === "S") ||
      (dir === "S" && newDir === "N") ||
      (dir === "E" && newDir === "W") ||
      (dir === "W" && newDir === "E")
    )
  }
})();
