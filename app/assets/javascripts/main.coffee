"use strict"

vars = {}

set_vars = ->
  vars =
    json: '{"ads":[{"data":{"ad_hides":{"enabled":true,"value":0},"click_url":"http://loopme.me/go2/tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU","type":"IMAGE","image_url":"http://i.loopme.me/db35436199e510a0.png","share_url":"http://loopme.me/go2/tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU","ad_shares":{"enabled":true,"value":0},"ad_likes":{"enabled":true,"value":0},"id":"tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU","download_btn_color":"#00AF33","delay":3000},"beacons":{"ad_show":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=AD_SHOW","ad_like":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=AD_LIKE","ad_hide":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=AD_HIDE","ad_share":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=AD_SHARE","video_start":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=VIDEO_STARTS","video_time":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=VIDEO_TIMES","video_complete":"http://loopme.me/api/v2/events?id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU&et=VIDEO_COMPLETES"}}],"version":"v0.2.383","session":{"si":"a2tkimzh","beacons":{"inbox_open":"http://loopme.me/api/v2/events?et=INBOX_OPEN&rid=a2tkimzh&id=tikjCKy-KsdWOBcFCcoz_Bmm79sW8PKt2_euiEAZPsU","ad_close":"http://loopme.me/api/v2/events?et=AD_CLOSE&rid=a2tkimzh"}}}'
    images: document.querySelectorAll('img')
    link_on_banner: document.querySelector('.banner_url')
    download_button: document.querySelector('.download')
    close_btn: document.querySelector('.close')
    social_button: document.querySelectorAll('.social_button')
set_props = ->
  data = JSON.parse(vars.json)
  set_banner = ->
    image_url = data.ads[0].data.image_url
    console.log image_url
    [].forEach.call vars.images, (image) ->
      image.src = image_url

  set_attr = ->
    click_url = data.ads[0].data.click_url
    download_btn_color = data.ads[0].data.download_btn_color

  # Set link to website from banner
    vars.link_on_banner.setAttribute('href', click_url)

  # Set download_button_color
    vars.download_button.style.backgroundColor = download_btn_color

  set_banner()
  set_attr()

set_events = ->
  data = JSON.parse(vars.json)
  # http GET function
  httpGet = (URL) ->
    xmlHttp = new XMLHttpRequest()
    xmlHttp.open "GET", URL, true
    xmlHttp.send()
    xmlHttp.responseText

  vars.close_btn.addEventListener "click", ->
    document.querySelector("html").innerHTML = ""


  #add eventListener on buttons
  [].forEach.call vars.social_button, (social_button) ->
    social_button.addEventListener "click", (e) ->
      url_get = e.target.className
      json = data.ads[0].beacons
      switch url_get
        when "ad_like"
          url_get = json.ad_like
        when "ad_hide"
          url_get = json.ad_hide
        when "ad_show"
          url_get = json.ad_show
        when "ad_share"
          url_get = json.ad_share
      httpGet(url_get)
      console.log url_get


# when image fully loaded request trigger as GET request
  vars.images[0].onload = ->
    inbox_open = data.session.beacons.inbox_open
    httpGet(inbox_open)


set_vars()
set_props()
set_events()
