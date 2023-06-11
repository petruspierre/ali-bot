function formChanged(e) {
  var text1 = document.getElementById('text1').value;
  var text2 = document.getElementById('text2').value;
  var text3 = document.getElementById('text3').value;
  var image1 = document.getElementById('image1').value;
  var image2 = document.getElementById('image2').value;
  var image3 = document.getElementById('image3').value;
  var seconds = document.getElementById('seconds').value;
  var active = document.getElementById('active').checked;

  var config = {
    text1,
    text2,
    text3,
    image1,
    image2,
    image3,
    seconds,
    active
  }

  chrome.runtime.sendMessage({ action: 2, values: config }, function(response) {
    this.close();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.sendMessage({ action: 3 }, function(response) {
    document.getElementById('text1').value = response.config.text1
    document.getElementById('text2').value = response.config.text2
    document.getElementById('text3').value = response.config.text3
    document.getElementById('image1').value = response.config.image1
    document.getElementById('image2').value = response.config.image2
    document.getElementById('image3').value = response.config.image3
    document.getElementById('seconds').value = response.config.seconds
    document.getElementById('active').checked = response.config.active
  });

  document.getElementById('save').addEventListener('click', formChanged);
})