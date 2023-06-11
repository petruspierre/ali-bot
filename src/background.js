var toggle = false;
var config = {
  text1: 'CHINA',
  text2: '',
  text3: '',
  image1: 'EU Plug',
  image2: '',
  image3: '',
  seconds: '01',
  active: false
}

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  switch (request.action) {
    case 1:
      sendResponse({ state: toggle, config: config });
      break;
    case 2:
      config = request.values;
      if(config.active){
        chrome.browserAction.setTitle({title: "Bot - Ativo"});
        chrome.browserAction.setIcon({path: "../assets/on.png"});
      }
      else{
        chrome.browserAction.setIcon({path: "../assets/off.png"});
        chrome.browserAction.setTitle({title: "Bot - Inativo"});
      }
      break;
    case 3:
      sendResponse({ config });
      break;
  }
});