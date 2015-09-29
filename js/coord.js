(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }

  var Coord = SGame.Coord = {};

  Coord.isOpposite = function(snakeDir, newDir) {
    return (
      (snakeDir === "N" && newDir === "S") ||
      (snakeDir === "S" && newDir === "N") ||
      (snakeDir === "E" && newDir === "W") ||
      (snakeDir === "W" && newDir === "E")
    )
  }
})();
