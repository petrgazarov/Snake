(function () {
  if (typeof SGame === "undefined") {
    window.SGame = {};
  }
  var Apple = SGame.Apple = function() {
    this.position = [
      Math.floor(Math.random() * 19),
      Math.floor(Math.random() * 19)
    ]
  }
}
