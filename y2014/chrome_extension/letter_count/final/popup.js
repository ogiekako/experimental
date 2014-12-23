document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({"active": true}, function(tabs) {
    var tab = tabs[0];
    chrome.tabs.executeScript(tab.id, {code: "document.body.innerText"}, function(results) {
      var text = results[0];
      console.log(text);
      var len = text.length;
      document.body.innerText = "The number of characters in " + tab.title + " is " + len + ".";
    });
  });
});

