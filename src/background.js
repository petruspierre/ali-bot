var toggle = false;
chrome.browserAction.onClicked.addListener(function(tab) {
  toggle = !toggle;
  if(toggle){
    chrome.tabs.executeScript(tab.id, { code:"alert('Bot ativado! Entre na página do produto novamenta para rodar')" });
    chrome.browserAction.setTitle({title: "Bot - Ativo"});
    chrome.browserAction.setIcon({path: "../assets/on.png"});
  }
  else{
    chrome.browserAction.setIcon({path: "../assets/off.png"});
    chrome.browserAction.setTitle({title: "Bot - Inativo"});
    chrome.tabs.executeScript(tab.id, { code:"alert('Bot desativado! Recarregando página')" });
    document.location.reload(true);
  }
});

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  console.log("Estado solicitado: " + toggle);

  sendResponse({ state: toggle });
});