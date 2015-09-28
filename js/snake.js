(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }

  var Snake = SGame.Snake = function() {
    this.dir = "N",
    this.segments = [[4, 4]]
  }

  Snake.prototype.move = function() {
    var that = this;

    if (this.dir === "N") {
      var newCoord = [- 1, 0];
    }
    else if (this.dir === "E") {
      var newCoord = [0, - 1];
    }
    else if (this.dir === "S") {
      var newCoord = [1, 0];
    }
    else if (this.dir === "W") {
      var newCoord = [0, 1];
    }

    this.changeSegments(newCoord);
  }

  Snake.prototype.changeSegments = function(newCoord) {
    this.segments.forEach(function(segment) {
      segment = [segment[0] + newCoord[0], segment[1] + newCoord[1]];
    });
  }

  Snake.prototype.isSnake = function(position) {
    this.segments.forEach(function(segment) {
      if (segment[0] === position[0] && segment[1] === position[1]) {
        return true;
      }
    });

    return false;
  }

  Snake.prototype.turn = function(newDir) {
    this.dir = newDir;
  }
})();
