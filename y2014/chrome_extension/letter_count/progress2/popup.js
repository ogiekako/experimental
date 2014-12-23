document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({"active": true}, function(tabs) {
    var tab = tabs[0];
    document.body.innerText = tab.title;
  });
});

