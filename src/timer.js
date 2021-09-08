function checkTimer() {
  const observer = new MutationObserver(function() {
    const minutes = jQuery('[data-role="minute"]').text()
    const seconds = jQuery('[data-role="second"]').text()
  
    console.log(minutes + ':' + seconds);
    if(minutes === '00' && seconds === '01') {
      setTimeout(function() {
        document.location.reload(true);
      }, 500)
    }
  });
  
  observer.observe(jQuery('[data-role="second"]')[0], { characterData: true, attributes: true, childList: true, subtree: true });
}

function checkProperties() {
  const chinaProp = jQuery('.sku-property-text:contains("CHINA")');
  const euPlugProp = jQuery('.sku-property-text:contains("Eu Plug")');
  
  if(chinaProp.length) {
    chinaProp.click();
  }
  
  if(euPlugProp.length) {
    euPlugProp.click();
  }
}

chrome.runtime.sendMessage({action: 1}, function(response) {
  console.log('Bot ativo? ' + response.state);

  if(response.state !== true) return;
  console.log('Rodando bot');

  var existCondition = setInterval(function() {
    console.log('Aguardando condições');
    if (jQuery('[data-role="second"]').length && jQuery('.count-down-timer').length) {
      clearInterval(existCondition);
      console.log('Condições detectadas');
      checkProperties();
      
      if(jQuery('.count-down-timer > .before-text').text() === 'Termina em') {
        console.log('Clicando para comprar');
        jQuery('.buynow').click();
      } else {
        console.log('Aguardando cronometro zerar');
        checkTimer();
      }
    }
  }, 100);
})
