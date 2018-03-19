var date = new Date;

/***********************************************************
** リアルタイム時刻表示
***********************************************************/
// 一桁のタイムに0をつけている
function timeAddZero(time) {
  var addZero
  if (time < 10) {
    addZero = '0' + time;
  }else {
    addZero = time;
  }
  return addZero;
}

function setNowTime() {
  var nowDate = new Date;
  var nowHour = timeAddZero(nowDate.getHours());
  var nowMinute = timeAddZero(nowDate.getMinutes());
  var nowSecond = timeAddZero(nowDate.getSeconds());
  var nowYear = timeAddZero(date.getFullYear());
  var nowMonth = timeAddZero(date.getMonth()+1);
  var nowDay = timeAddZero(date.getDate());
  var nowTime = 'Date:' + nowYear + '/' + nowMonth + '/' + nowDay + ' Time:'+ nowHour + ':' + nowMinute + ':' + nowSecond;
  $('#mainContent_timer').html(nowTime);
}

function showNowTime() {
  setInterval('setNowTime()',1000);// 一秒ごとにsetNowTimeを呼び出し
}
/***********************************************************
** リアルタイム時刻表示
***********************************************************/
/***********************************************************
** カレンダー
***********************************************************/
function Calendar() {
  $('#start_day').pickadate({
    format: 'yyyy/mm/dd',
    min: [date.getFullYear(), date.getMonth()+1, date.getDate()],
    max: 1000
  });
  $('#end_day').pickadate({
    format: 'yyyy/mm/dd',
    max:31
  });
}
/***********************************************************
** カレンダー
***********************************************************/

function initialize() {
  showNowTime();
  Calendar();
}

$(initialize);
