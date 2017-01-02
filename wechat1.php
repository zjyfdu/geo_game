<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx24f588909de68d72", "9596f71032411d94cd43bccf08155cb7");
$signPackage = $jssdk->GetSignPackage();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>wechat integration</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <link rel="stylesheet" href="css/style.css">
</head>
<body ontouchstart="">
<p>a knight is a person who was granted an honorary title by the king or leader. Usually, a knight is skilled in battle on horseback and fights for the his or her lord.<br> </p>
<img src="http://pic.58pic.com/58pic/13/19/91/70T58PIC8Cw_1024.jpg"  alt="knight" height="200"  />
      
<div class="wxapi_container">
    <div class="lbox_close wxapi_form">
      <h3 id="menu-basic">fundamental API</h3>
      <span class="desc">if JS API is avaiable</span>
      <button class="btn btn_primary" id="checkJsApi">checkJsApi</button>

      <h3 id="menu-share">Share</h3>
      <span class="desc">share on moments</span>
      <button class="btn btn_primary" id="onMenuShareTimeline">onMenuShareTimeline</button>
      <span class="desc">send to chat</span>
      <button class="btn btn_primary" id="onMenuShareAppMessage">onMenuShareAppMessage</button>
      <span class="desc">send to QQ</span>
      <button class="btn btn_primary" id="onMenuShareQQ">onMenuShareQQ</button>
      <span class="desc">send to Tencent weibo</span>
      <button class="btn btn_primary" id="onMenuShareWeibo">onMenuShareWeibo</button>
      <span class="desc">share on QZone</span>
      <button class="btn btn_primary" id="onMenuShareQZone">onMenuShareQZone</button>

      <h3 id="menu-image">image API</h3>
      <span class="desc">take photo or choose from album</span>
      <button class="btn btn_primary" id="chooseImage">chooseImage</button>
      <span class="desc">preview</span>
      <button class="btn btn_primary" id="previewImage">previewImage</button>
      <span class="desc">upload</span>
      <button class="btn btn_primary" id="uploadImage">uploadImage</button>
      <span class="desc">download</span>
      <button class="btn btn_primary" id="downloadImage">downloadImage</button>

      <h3 id="menu-voice">voice API</h3>
      <span class="desc">start to record</span>
      <button class="btn btn_primary" id="startRecord">startRecord</button>
      <span class="desc">stop</span>
      <button class="btn btn_primary" id="stopRecord">stopRecord</button>
      <span class="desc">play</span>
      <button class="btn btn_primary" id="playVoice">playVoice</button>
      <span class="desc">pause</span>
      <button class="btn btn_primary" id="pauseVoice">pauseVoice</button>
      <span class="desc">stop play</span>
      <button class="btn btn_primary" id="stopVoice">stopVoice</button>
      <span class="desc">upload</span>
      <button class="btn btn_primary" id="uploadVoice">uploadVoice</button>
      <span class="desc">download</span>
      <button class="btn btn_primary" id="downloadVoice">downloadVoice</button>

      <h3 id="menu-smart">intelligent API</h3>
      <span class="desc">voice recognize</span>
      <button class="btn btn_primary" id="translateVoice">translateVoice</button>

      <h3 id="menu-device">device information API</h3>
      <span class="desc">network status</span>
      <button class="btn btn_primary" id="getNetworkType">getNetworkType</button>

      <h3 id="menu-location">geography API</h3>
      <span class="desc">not sure yet</span>
      <button class="btn btn_primary" id="openLocation">openLocation</button>
      <span class="desc">your position</span>
      <button class="btn btn_primary" id="getLocation">getLocation</button>


      <h3 id="menu-scan">scan</h3>
      <span class="desc">scan API</span>
      <button class="btn btn_primary" id="scanQRCode0">scanQRCode</button>
      <button class="btn btn_primary" id="scanQRCode1">scanQRCode</button>

    </div>
  </div>
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
  wx.config({
      debug: true,
      appId: '<?php echo $signPackage["appId"];?>',
      timestamp: '<?php echo $signPackage["timestamp"];?>',
      nonceStr: '<?php echo $signPackage["nonceStr"];?>',
      signature: '<?php echo $signPackage["signature"];?>',
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ]
  });
</script>
    <script src="js/zepto.min.js"></script>
    <script src="js/demo.js"> </script>
</html>
