chrome.tabs.onUpdated.addListener( function (_, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    chrome.tabs.executeScript(tab.ib, {
      file: "injector.js"
    });
  }
})
