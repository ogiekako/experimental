var currentDomain = undefined;

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.onActivated.addListener(function(tabId, selectInfo) {
    tick();
  });
  chrome.windows.onFocusChanged.addListener(function(windowId) {
    tick();
  });
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("onUpdated.");
    tick();
  });
});

function tick() {
 if (currentDomain) {
    tack(currentDomain);
  }
  currentDomain = undefined;

  getActiveTabInActiveWindow(function(tab){
    // Set start time.
    var domain = getDomain(tab["url"]);
    var key = domain + ":start";
    var update = {};
    update[key] = curTime();
    chrome.storage.sync.set(update);
    currentDomain = domain;
  });
}

function tack(domain) {
  var key = domain + ":start";
  chrome.storage.sync.get(key, function(item) {
    var start = item[key];
    var elapsed = curTime() - start;

    // Update the total time.
    var key2 = domain + ":sum";
    chrome.storage.sync.get(key2, function(item2) {
      var sum = 0;
      if (item2[key2]) {
        sum = item2[key2];
      }
      sum += elapsed;
      var update = {};
      update[key2] = sum;
      chrome.storage.sync.set(update);
    });
  });
}

function getActiveTabInActiveWindow(callback) {
  chrome.windows.getCurrent({populate:true}, function(window) {
    var tabs = window["tabs"];
    for (var i=0;i<tabs.length;i++){
      if (tabs[i]["active"]){
        callback(tabs[i]);
      }
    }
  });
}

function curTime() {
  return new Date().getTime();
}

function getDomain(url) {
  return url.split("/")[2];
}

