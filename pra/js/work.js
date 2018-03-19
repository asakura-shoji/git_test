self.addEventListener('message', function(e) {

  //何か同時進行で行う処理

  //処理結果を送信
  self.postMessage(e.data);
}, false);

onmessage = function(e) {
  console.log(e.data);
  postMessage(e.data);
}
