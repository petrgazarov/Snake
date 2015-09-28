SGame.Snake = function() {
  dir: ["N", "E", "S", "W"],
  segments: [[4, 4]],
  move: function() {

  },
  turn: function(newDir) {
    this.dir = newDir;
  }
}
