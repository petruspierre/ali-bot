chrome.runtime.sendMessage({ action: 1 }, function(response) {
  console.log('Configurações do bot', response.config);

  if(response.config.active !== true) return;
  console.log('Rodando bot');

  var existCondition = setInterval(function() {
    console.log('Aguardando condições');
    if (jQuery('.selected-payment-info .pay-name').length) {
      console.log('Condições detectadas');
      clearInterval(existCondition);
      if(jQuery('.selected-payment-info .pay-name').text() === 'Pix') {
        $('#checkout-button').click();
      }
    }
  }, 100);
})
