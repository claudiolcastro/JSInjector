function scriptsRegister() {
  const script_page = document.getElementById('script_page').value
  const script_value = document.getElementById('script_value').value

  let value = {};
  value[script_page] = script_value

  chrome.storage.sync.get(['key'], function(result) {
    let list = result.key || [];
    list.push(value);
    chrome.storage.sync.set({ key: list }, function() {
      console.log('Value is set to ' + JSON.stringify(value));
      buildScriptsList();
    });
  });
  
}

function buildScriptsList() {
  chrome.storage.sync.get(['key'], function(result) {
    let scripts = result.key
    const tbody = document.querySelector('.js-table');

    tbody.innerHTML = '<tr><th>url</th><th>script</th></tr>';

    for(let script in scripts){
      for(let key in scripts[script]){
        let row = `<tr><td>${key}</td><td>${scripts[script][key].replace(/\n/g, "<br/>")}</td></tr>`;
        tbody.innerHTML += row;
      }
    }
    console.log('Value currently is ' + JSON.stringify(result.key));
  });
}

document.addEventListener('DOMContentLoaded', function() {
  buildScriptsList();
  document.getElementById("btn").addEventListener("click", function(e){
    e.preventDefault();
    // chrome.extension.getBackgroundPage().console.log('foo');
    // alert("clicou no btn!");
    scriptsRegister();
  });
});