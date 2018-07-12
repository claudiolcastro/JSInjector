function getCurrentUrl() {
  return window.location.href;
}

function scriptsList() {
  let scripts = {
    'https://www.google.com': 'alert("tá no google!")',
    'https://': 'alert("página https!")\nalert("segundo alert")'
  }

  return scripts; 
}

function scriptsRetriever(currentPage) {
  const page = currentPage;
  const scripts = scriptsList(); 

  for(let key in scripts){
    if(page.match(key)){
      eval(scripts[key])
    }
  }
}

function buildScriptsList() {
  const scripts = scriptsList();
  const tbody = document.querySelector('.js-table');
  let row = '';

  for(let key in scripts){
    row = `<tr><td>${key}</td><td>${scripts[key].replace(/\n/g, "<br/>")}</td></tr>`;
    tbody.innerHTML += row;
  }
}

(function injectScript() {
  scriptsRetriever(getCurrentUrl())
})();

document.addEventListener('DOMContentLoaded', function() {
  buildScriptsList();
  document.getElementById("btn").addEventListener("click", function(e){
    e.preventDefault();
    scriptsRegister();
  });
});