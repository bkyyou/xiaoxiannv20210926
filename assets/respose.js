(function(doc, win) {
  var docEl = doc.documentElement;
  var recalc = function() {
    var clientWidth = docEl.clientWidth;
    var clientHeight = docEl.clientHeight;
    var aspectRatio = clientWidth / clientHeight;
    console.log(clientWidth)
    console.log(clientHeight)
    // if (aspectRatio > 1280 / 960) { 
    // docEl.style.fontSize = 100 * (clientHeight / 960) + "px";
    // window.base = 100 * (clientHeight / 960);
    // } else {
      docEl.style.fontSize = 100 * (clientWidth / 1280) + "px";
      window.base = 100 * (clientWidth / 1280);
    // }
  };

  var timer = null;
  win.addEventListener(
    "resize",
    function() {
      clearTimeout(timer);
      timer = setTimeout(function() {
        recalc();
      }, 100);
    },
    false
  );
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);