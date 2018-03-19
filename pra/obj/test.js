
var obj = JSON.parse(document.getElementById('data').innerText)
obj.forEach(function(item) {
  document.getElementById('aaa').innerText += item.name;
});
