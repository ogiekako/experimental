// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get(null, function(items) {
    console.log(items);
    var ks = Object.keys(items);
    var bodyHTML = "<table>\n";
    for (var i=0;i<ks.length;i++) {
      var key = ks[i];
      var j = key.indexOf(":sum");
      if (j < 0) {
        continue;
      }
      var base = key.substring(0, j);
      var time = items[key];
      bodyHTML += "<tr><td>" + base + "</td><td>" + 
      Math.round(time/1000) + "s</td></tr>\n"
    }
    bodyHTML += "</table>";
    document.body.innerHTML = bodyHTML;
  });
});

