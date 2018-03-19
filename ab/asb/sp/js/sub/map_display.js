/**
 * Marker & InfoWindow
 */

;(function() {

  var map = JKG.map;
  var scrollSpeed  = 300;
  var currentMarker = null;
  var firstMarker = null;
  var currentInfoWindow = null;
  var flickMarker = null;
  var flickInfoWindow = null;
  var $setMainId = $('.spotMap-listOuter');
  var $setMainUl = $setMainId.children('ul');
  var spotNameFix = [];
  var areaNameFix = [];
  var spotName = $('.spotlist-tit');
  var areaName = $('.item-area');
  var listWidth;
  var firstListMargin;
  var leftMax;
  var ulWidth;
  var listCount = $setMainUl.children('li').length;
  
  function setSize(){
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    listWidth = screenWidth < 359 ? parseInt(screenWidth*0.916) : parseInt(screenWidth*0.816);
    firstListMargin = (screenWidth - listWidth) / 2;
    var mapHeight = screenHeight - 47;
    if(mapHeight < 250) mapHeight = 300;
    leftMax = -(listWidth+10)*(listCount-1);
    ulWidth = ((listWidth+10)*(listCount))-10;
    $setMainUl.css({width:ulWidth});
    
    if (currentInfoWindow) {
      var id = currentInfoWindow.anchor.id;
      $setMainUl.css('left', id===1 ? 0 : -(listWidth*(id-1))-(10*(id-1)));
    };
    
    $('#spotMap').css('height', mapHeight);
    $setMainId.css('width', screenWidth);
    $setMainUl.children('li').css('width', listWidth);
    $setMainUl.css('margin-left', firstListMargin);
  }
  
  function resize(){
    $(window).on('resize', function(){
      setSize();
      listTxtChange();
    });
  }
  
  var setListName = function(name, nameFix) {
    for (var i = 0; i < name.length; i++) {
      nameFix.push(name[i].innerHTML)
    }
  }
  
  function listTxtChange() {
    var spotName = $('.spotlist-tit');
    var areaName = $('.item-area');
    var spotMaxLine = 30;
    var areaMaxLine = 24;
    listTxtLeng(spotName,spotNameFix,spotMaxLine);
    listTxtLeng(areaName,areaNameFix,areaMaxLine);
  }
  
  function listTxtLeng(listName, listNameFix, lineMax) {
    for (var i = 0; i < listName.length; i++) {
      listName[i].innerHTML = listNameFix[i];
      if (lineMax >= listName.eq(i).height()) {
        continue;
      }
      for (var k = 0; k < listName[i].innerHTML.length; k++) {
        if (lineMax >= listName.eq(i).height()) {
          break;
        }
        if (k === 0) {
          listName[i].innerHTML = listName[i].innerHTML.slice(0, -2) + '...';
        }else {
          listName[i].innerHTML = listName[i].innerHTML.slice(0, -4) + '...';
        }
      }
    }
  }
  
  var marker = {
    getMarkerObj: function (mapObj, MARKER_ARRAY, POPUP_LIMIT) {
    var markerObj = [];
    var zIndexMax = MARKER_ARRAY.length;

    var Marker = function (marker) {
      var that = this;
      this.marker = new google.maps.Marker({
        id: marker.id,
        position: new google.maps.LatLng(marker.latitude, marker.longitude),
        map: mapObj,
        icon: {
          url: '/asb/sp/images/map_markers_2x.png',
          size: new google.maps.Size(22, 29),
          scaledSize: new google.maps.Size(660, 58),
          origin: new google.maps.Point((marker.id - 1) * 22, 0)
        },
        zIndex: MARKER_ARRAY.length - marker.id
      });
      this.infoWindow = new google.maps.InfoWindow({
        content: marker.content,
        disableAutoPan: true
      });
      this.init = function () {
        google.maps.event.addListener(that.marker, 'click', function() {
          var index = that.marker.id - 1;
          if (flickMarker) {
            flickMarker.setMap(null);
          }
          if (that.infoWindow === currentInfoWindow) {
            // 選択済みマーカーをクリックしたとき
            // console.log('off by double');
            that.markerOff(marker);
          } else {
            if (currentInfoWindow) {
              // 他のマーカーが選択されているとき
              // console.log('off by change');
              currentMarker.setOptions({
                icon : {
                  url: '/asb/sp/images/map_markers_2x.png',
                  size: new google.maps.Size(22, 29),
                  scaledSize: new google.maps.Size(660, 58),
                  origin: new google.maps.Point((currentMarker.id - 1) * 22, 0)
                },
                zIndex: MARKER_ARRAY.length - currentMarker.id
              });
              that.markerOff(marker);
            }
            that.markerOn(that.marker);
            var connectCont = this.id -1;
            var $tgt = $setMainUl.find('li').eq(index);
            $setMainUl.stop().animate({left:(-((listWidth)*(connectCont)+(10*(connectCont-1))+10))},scrollSpeed);
            map.TARGET_MAP.setCenter(new google.maps.LatLng(MARKER_ARRAY[this.id-1].latitude, MARKER_ARRAY[this.id-1].longitude));
          }
        });
        google.maps.event.addListener( that.infoWindow , 'closeclick' , function() {
          // バルーンの閉じるボタンをクリックしたときはフォーカスをはずす
          // console.log('off by xbtn');
          flickInfoWindow = null;
          that.markerOff(marker);
        });
        return this;
       };
      this.markerOn = function(marker) {
        that.infoWindow.open(mapObj, that.marker);
        that.marker.setOptions({
          icon : {
            url: '/asb/sp/images/map_markers_2x.png',
            size: new google.maps.Size(22, 29),
            scaledSize: new google.maps.Size(660, 58),
            origin: new google.maps.Point((marker.id - 1) * 22, 29)
          },
          zIndex : zIndexMax
        });

        currentMarker = that.marker;
        currentInfoWindow = that.infoWindow;

        return this;
      };
      this.markerOff = function(marker) {
        currentInfoWindow.close();
        that.marker.setOptions({
          icon : {
            url: '/asb/sp/images/map_markers_2x.png',
            size: new google.maps.Size(22, 29),
            scaledSize: new google.maps.Size(660, 58),
            origin: new google.maps.Point((marker.id - 1) * 22, 0)
          },
          zIndex: MARKER_ARRAY.length - marker.id
        });

        currentMarker = null;
        currentInfoWindow = null;

        return this;
      };
      leftMax = -(listWidth+10)*(listCount-1);
      ulWidth = ((listWidth+10)*(listCount))-10;
      var flag = 0;
      var isTouch = ('ontouchstart' in window);
      $setMainUl.bind(
          {'touchstart mousedown': function(e){
              if(e.originalEvent.touches.length > 1 || $(e.target)[0] === $setMainUl[0]){
                  flag = 1;
                  return;
              }else {
                  flag = 0;
              }
              var $setMainUlNot = $setMainId.children('ul:not(:animated)');
              $setMainUlNot.each(function(){
                  e.preventDefault();
                  this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
                  this.leftBegin = parseInt($(this).css('left'));
                  this.left = parseInt($(this).css('left'));
                  this.touched = true;
              });
          },'touchmove mousemove': function(e){
              if(e.originalEvent.touches.length > 1 || $(e.target)[0] === $setMainUl[0] || !this.touched){
                  return;
              }
              e.preventDefault();
              this.left = this.left - (this.pageX - (isTouch ? event.changedTouches[0].pageX : e.pageX) );
              this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);

              if(this.left < 0 && this.left > leftMax){
                  $(this).css({left:this.left});
              } else if(this.left >= 0) {
                  $(this).css({left:'0'});
              }
          },'touchend mouseup mouseout': function(e){
              if(e.originalEvent.touches.length > 1 || $(e.target)[0] === $setMainUl[0] || !this.touched){
                  return;
              }
              this.touched = false;
              var str = $(e.target).parents("li")[0].className;
              var str2 = str.replace(/[^0-9^\.]/g,"");
              var str3 = parseFloat(str2)-1;
              
              if (this.leftBegin === this.left && flag === 0) {
                location.href = $(e.target).parents("li").children("a").attr("href");
              }else if(this.leftBegin > this.left && this.leftBegin > leftMax){
                $(this).stop().animate({left:((this.leftBegin)-(listWidth+10))},scrollSpeed);
                markerFlick(str3+1);
              } else if(this.leftBegin < this.left && this.leftBegin < 0) {
                $(this).stop().animate({left:((this.leftBegin)+(listWidth+10))},scrollSpeed);
                markerFlick(str3-1);
              }
              
              function markerFlick(id) {
                // 他のマーカーが選択されているとき
                if (flickInfoWindow != null) {
                  flickInfoWindow.close();
                  flickMarker.setMap(null);
                  currentMarker.setOptions({
                    icon : {
                      url: '/asb/sp/images/map_markers_2x.png',
                      size: new google.maps.Size(22, 29),
                      scaledSize: new google.maps.Size(660, 58),
                      origin: new google.maps.Point((currentMarker.id - 1) * 22, 0)
                    },
                    zIndex: MARKER_ARRAY.length - currentMarker.id
                  });
                  that.markerOff(marker);
                  flickMarker = null;
                  flickInfoWindow = null;
                }else if (flickInfoWindow === null && currentInfoWindow) {
                  currentInfoWindow.close();
                  currentMarker.setOptions({
                    icon : {
                      url: '/asb/sp/images/map_markers_2x.png',
                      size: new google.maps.Size(22, 29),
                      scaledSize: new google.maps.Size(660, 58),
                      origin: new google.maps.Point((currentMarker.id - 1) * 22, 0)
                    },
                    zIndex: MARKER_ARRAY.length - currentMarker.id
                  });
                }
                // 他のマーカーが選択されているとき
                // 画面中央に
                JKG.map.TARGET_MAP.setCenter(new google.maps.LatLng(marker_array[id].latitude, marker_array[id].longitude));
                // 画面中央に
                flickMarker = new google.maps.Marker({
                  id: id+1,
                  map: mapObj,
                  position: new google.maps.LatLng(marker_array[id].latitude, marker_array[id].longitude),
                  icon : {
                    url: '/asb/sp/images/map_markers_2x.png',
                    size: new google.maps.Size(22, 29),
                    scaledSize: new google.maps.Size(660, 58),
                    origin: new google.maps.Point((id) * 22, 29)
                  },
                  zIndex : zIndexMax
                });
                // フリックに合わせてマーカーの情報ウィンドウが変わる
                that.infoWindow = new google.maps.InfoWindow({
                  content: marker_array[id].content,
                  disableAutoPan: true
                });
                // フリックに合わせてマーカーの情報ウィンドウが変わる
                // 情報ウィンドウを開く
                that.infoWindow.open(mapObj, flickMarker);
                // 情報ウィンドウを開く
                currentMarker = that.marker;
                currentInfoWindow = that.infoWindow;
                flickInfoWindow = that.infoWindow;
              }
          }
      });
      return this;
    };

    var bounds = new google.maps.LatLngBounds();

    var i, tempMarkerObj;
    var markerNum = MARKER_ARRAY.length;

    for(i = 0; i < markerNum; i++) {
      tempMarkerObj =  new Marker(MARKER_ARRAY[i]);
      markerObj.push(tempMarkerObj);
      tempMarkerObj.init();
      if (i < POPUP_LIMIT) {
        tempMarkerObj.infoWindow.open(mapObj, tempMarkerObj.marker);
      }
      bounds.extend(new google.maps.LatLng(MARKER_ARRAY[i].latitude, MARKER_ARRAY[i].longitude));
    }
    mapObj.fitBounds(bounds);
    var listener = google.maps.event.addListener(mapObj, 'idle', function() {
      // $(map.el).find('.gm-style-mtc').parent('.gmnoprint').css({'display': 'none'});
      if (mapObj.getZoom() > 12) mapObj.setZoom(12);
      google.maps.event.removeListener(listener);
    });

    this.addEventListener($(map.el));
      return markerObj;
    },
    addEventListener: function ($el) {}

  };
  
  function trimSpotThumbnail() {
    $(window).on('load', function() {
      $('.spotMap-listItem > .spotMap-itemPhoto > img').each(function(i, el) {
        var $el = $(el);
        if($el.width() >= $el.height()) {
          $el.addClass('is-horizontal');
        } else {
          $el.addClass('is-vertical');
        }
      });
    });
  }
  
  function searchBtnClick() {
    $('.btn-reSearch').on('click', function () {
      // 遷移時ちらつき防止
      return false;
    });
  }
  
  function initialize() {
    $('.spotMap-outer').show();
    setSize();
    trimSpotThumbnail();
    setListName(spotName, spotNameFix);
    setListName(areaName, areaNameFix);
    listTxtChange();
    resize();
    searchBtnClick();
    if (marker_array.length > 0) {
      map.getGoogleMapObj({
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false
      });
      marker.markerObj = marker.getMarkerObj(map.TARGET_MAP, marker_array, popup_limit);
      new google.maps.event.trigger(marker.markerObj[0].marker, 'click');
    }
  }

  $(initialize);
  
})();

JKG.ui.dispModalNav = function(e) {
  var $this = $(this);
  var btnId = $this.attr('id');
  var modalName = btnId.replace('Btn', '');
  $modalName = $('.' + modalName);
  var $target = $('main > *').not($modalName);
  var $hideTarget = $('.footerNav, .deviceChange, .pagetopLink, #jlnListingPage');

  //表示、該当のモーダル以外のコンテンツとロゴ以外のフッターを非表示
  $target.hide();
  $hideTarget.hide();
  $($modalName).fadeIn('fast');
  $('body').addClass('pB0');
  
  //閉じるボタン押下後
  $('.modalNavCloseBtn').off('click');
  $('.modalNavCloseBtn').on('click', function() {
    $target.show();
    $hideTarget.show();
    $('.modalNav').hide();
    $('body').removeClass('pB0');
    $('html, body').animate({scrollTop : $('#research').offset().top});
  });
  e.preventDefault();
};

/**
 * エリア・ジャンルを変更するのメニュー表示
 * JKG.ui.dispModalNavのtop移動してしまう処理を検索に戻るように変更しただけ
 */
JKA.activity.dispAreaModalNav = function (e) {
  var $this = $(this);
  var btnId = $this.attr('id');
  var modalName = btnId.replace('Btn', '');
  var $modalName = $('.' + modalName);
  var $target = $('main > *').not($modalName);
  var $hideTarget = $('.footerNav, .deviceChange, .pagetopLink, #jlnListingPage');
  var $hideTargetNav = $('.jlnsp-activity__fixedNavs');
  var fixedNavFlg = $hideTargetNav.is(':visible');
  //渡ってくるnodeがあれば格納
  var $offsetNode = $('.activitySearch') || '';

  //表示、該当のモーダル以外のコンテンツとロゴ以外のフッターを非表示
  $target.hide();
  $hideTarget.hide();
  if (fixedNavFlg) {
    $hideTargetNav.hide();
  }
  $($modalName).fadeIn('fast');
  $('body').addClass('pB0');
  $('html, body').animate({ scrollTop: 0 }, 1, 'swing');

  //閉じるボタン押下後
  $('.modalNavCloseBtn').off('click').on('click', function () {
    $target.show();
    $hideTarget.show();
    if (fixedNavFlg) {
      $hideTargetNav.show();
    }
    $('.modalNav').hide();
    $('body').removeClass('pB0');
    //渡ってくるnodeがあれば指定した位置へ移動
    $('html, body').animate({scrollTop : $('#research').offset().top});
  });
  e.preventDefault();
};
