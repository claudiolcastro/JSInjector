function getCurrentUrl() {
  return window.location.href;
}

function scriptsList(page) {
  chrome.storage.sync.get(['key'], function(result) {
    let scripts = result.key
    for(let script in scripts){
      for(let key in scripts[script]){
        if(page.match(key)){
          eval(scripts[script][key])
        }
      }
    }
    console.log('Value currently is ' + JSON.stringify(result.key));
  });
}

(function injectScript() {
  scriptsList(getCurrentUrl());
})();
