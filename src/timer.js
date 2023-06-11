function checkTimer(config) {
  const observer = new MutationObserver(function() {
    const minutes = jQuery('[data-role="minute"]').text()
    const seconds = jQuery('[data-role="second"]').text()
  
    console.log(minutes + ':' + seconds);
    if(minutes === '00' && seconds === config.seconds) {
      setTimeout(function() {
        document.location.reload(true);
      }, 500)
    }
  });
  
  observer.observe(jQuery('[data-role="second"]')[0], { characterData: true, attributes: true, childList: true, subtree: true });
}

function checkProperties(config) {
  const text1Prop = config.text1 ? jQuery(`.sku-property-text:contains("${config.text1}")`) : [];
  const text2Prop = config.text2 ? jQuery(`.sku-property-text:contains("${config.text2}")`) : [];
  const text3Prop = config.text3 ? jQuery(`.sku-property-text:contains("${config.text3}")`) : [];
  const image1Prop = config.image1 ? jQuery(`.sku-property-image img[alt="${config.image1}"]`) : [];
  const image2Prop = config.image2 ? jQuery(`.sku-property-image img[alt="${config.image3}"]`) : [];
  const image3Prop = config.image3 ? jQuery(`.sku-property-image img[alt="${config.image3}"]`) : [];
  
  if(text1Prop.length) {
    text1Prop.click();
  }
  if(text2Prop.length) {
    text2Prop.click();
  }
  if(text3Prop.length) {
    text3Prop.click();
  }
  if(image1Prop.length) {
    image1Prop.click();
  }
  if(image2Prop.length) {
    image2Prop.click();
  }
  if(image3Prop.length) {
    image3Prop.click();
  }
}

chrome.runtime.sendMessage({ action: 1 }, function(response) {
  console.log('Configurações do bot', response.config);

  if(response.config.active !== true) return;
  console.log('Rodando bot');

  var existCondition = setInterval(function() {
    console.log('Aguardando condições');
    if (jQuery('[data-role="second"]').length && jQuery('.count-down-timer').length) {
      clearInterval(existCondition);
      console.log('Condições detectadas');
      checkProperties(response.config);
      
      if(jQuery('.count-down-timer > .before-text').text() === 'Termina em') {
        console.log('Clicando para comprar');
        jQuery('.buynow').click();
      } else {
        console.log('Aguardando cronometro zerar');
        checkTimer(response.config);
      }
    }
  }, 100);
})
