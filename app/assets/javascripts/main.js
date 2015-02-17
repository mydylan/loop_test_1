var json = '{"ads":[{"data":{"ad_hides":{"enabled":true,"value":0},"click_url":"http://loopme.me/go2/tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU","type":"IMAGE","image_url":"http://i.loopme.me/db35436199e510a0.png","share_url":"http://loopme.me/go2/tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU","ad_shares":{"enabled":true,"value":0},"ad_likes":{"enabled":true,"value":0},"id":"tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU","download_btn_color":"#00AF33","delay":3000},"beacons":{"ad_show":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=AD_SHOW","ad_like":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=AD_LIKE","ad_hide":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=AD_HIDE","ad_share":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=AD_SHARE","video_start":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=VIDEO_STARTS","video_time":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=VIDEO_TIMES","video_complete":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=VIDEO_COMPLETES"}}],"version":"v0.2.383","session":{"si":"a2tkimzh","beacons":{"inbox_open":"http://loopme.me/api/v2/events?et=INBOX_OPEN&rid=a2tkimzh&id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU","ad_close":"http://loopme.me/api/v2/events?et=AD_CLOSE&rid=a2tkimzh"}}}'

var image_url,
	click_url,
  download_btn_color,
  share_url,
	ad_like,
	ad_hide, 
	ad_share,
  ad_show,
	inbox_open,
  ad_close,
  data = JSON.parse(json),
  images = document.querySelectorAll('img'),
  download_button = document.querySelector('.download'),
  link_on_banner = document.querySelector('.banner_url'),
  close_btn = document.querySelector('.close'),
  social_button = document.querySelectorAll('.social_button');

image_url = data.ads[0].data.image_url;

//add event handler on banner
click_url = data.ads[0].data.click_url;

download_btn_color = data.ads[0].data.download_btn_color;
share_url = data.ads[0].data.share_url;

console.log(data);
//events on buttons. Send GET request
ad_like = data.ads[0].beacons.ad_like;
ad_hide = data.ads[0].beacons.ad_hide; 
ad_show = data.ads[0].beacons.ad_show;
ad_share = data.ads[0].beacons.ad_share;



//when image fully loaded request trigger as GET request
inbox_open = data.session.beacons.inbox_open;

ad_close = data.session.beacons.ad_close;



//Set banner
//Array.prototype ....call forEach loop
[].forEach.call(images, function(images){
  images.src = image_url;
});

//Set link to website from banner
link_on_banner.setAttribute('href', click_url);

//Set download_button_color
(function(){
  download_button.style.backgroundColor = download_btn_color;
})();

//add clear properties to CLOSE button
close_btn.addEventListener('click', function(){
  document.querySelector('html').innerHTML = '';
});


// Banner buttons should take proper link and send GET request to it when buttons pressed (ad_like, ad_hide, ad_share)
//function that take URL and send GET request
function httpGet(URL){
  var xmlHttp;
  
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", URL, true );
  xmlHttp.send();
  return xmlHttp.responseText;
}

//add eventListener on buttons
[].forEach.call(social_button, function(social_button){
  social_button.addEventListener('click', function(e){
    var url_get = e.target.className,
        count,
        value;
    switch(url_get) {
      case 'ad_like':
        url_get = data.ads[0].beacons.ad_like
        break
      case 'ad_hide':
        url_get = data.ads[0].beacons.ad_hide
        break
      case 'ad_show':
        url_get = data.ads[0].beacons.ad_show
        break
      case 'ad_share':
        url_get = data.ads[0].beacons.ad_share
        break
    };
    console.log(url_get);
    httpGet(url_get);
    //Social bar should provide simple functionality like collecting and storing data (WebStorage, cookie, etc.)
    // count = 0;
    // value = window.localStorage.getItem(url_get) + count;
    // console.log(value);
    // window.localStorage.setItem(url_get, value + 1);
    // debugger
    
  });
});


// when image fully loaded request trigger as GET request
images[0].onload = function(){
  httpGet(inbox_open); 
};



