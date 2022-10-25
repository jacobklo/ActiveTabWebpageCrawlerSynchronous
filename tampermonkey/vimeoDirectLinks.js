// ==UserScript==
// @name         Vimeo direct links finder
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Get all Vimeo direct links to video from CDN
// @author       Jacob Lo
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_log
// ==/UserScript==

/**

Vimeo private videos, I want to get the direct link of videos ( 360p, 1080p, etc ) from the CDN, so i can download that link using youtube-dl.

Website embed vimeo's video.
It uses shadow DOM.

All the direct links is hiding in the script DOM inside shadow DOM.

Currently, this tampermonkey's script is ran both on main embedded website, and inside shadow DOM.
So, I just hack it by calling console.log() for all matched links

Check sample sourse code at the buttom
**/
let run = function() {
  // confirm this script is running
  $( "body" ).prepend( "<h1>Video LINKK</h1>" );
  console.log("Video LINKK");

  // find all script tag
  $('script').each(function(index, element) {
    let thisScript = element.outerHTML;
    let sperificSite = "vod-progressive.akamaized.net";
    var urlRegex = /(\b(https?|ftp|file):\/\/(vod-progressive.akamaized.net)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    // Process that script tag as text document, and find all website using urlRegex
    let allURLs = thisScript.match(urlRegex);
    console.log('allURLs', allURLs);

    // Show all video links in console
    for(let i = 0; allURLs && i < allURLs.length; i++) {
      console.log(allURLs[i]);
    }

  });
};

(function() {
    'use strict';

    window.addEventListener("load", function() {
        // delay to run this script to wait all DOM loaded
        setTimeout(run, 2000);
    }, false);

})();



/**
<!-- main website ''>
<html>
<body>

<video-player free="">
<!-- vimeo embedded -->
#shadow-root
<html>
   <body>
      <div class="wrapper">
         <div class="vid" data-vimeo-initialized="true">
            <iframe src="https://player.vimeo.com/video/486807090?h=a94b85c91c&amp;app_id=122963" width="426" height="240" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="" title="basics-getting-started" data-ready="true">
              #document
                <html lang="en">
                  <head>
                     <meta charset="utf-8">
                     <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=yes">
                     <meta name="robots" content="noindex">
                     <title>basics-getting-started from Jeff Delaney on Vimeo</title>

                  </head>
                  <body class="vp-center">
                     <h1>Video LINKK</h1>
                     <div id="player" class="player player-ca07d226-885f-4b84-91f2-f09577c330be js-player-fullscreen with-fullscreen with-sticky-custom-logo player-normal player-xs" style="max-width: calc(177.778vh); height: calc(56.25vw);">
                        <!-- ...... -->
                     </div>
                     <script> (function(document, player) { var config = {
    "cdn_url": "https://f.vimeocdn.com",
    "vimeo_api_url": "api.vimeo.com",
    "request": {
      "files": {
        "dash": {
          "separate_av": true,
          "streams": [
            {
              "profile": 165,
              "quality": "540p",
              "id": "1e8afd0b-359d-4518-8eb5-b74055174db8",
              "fps": 29
            },
            {
              "profile": 139,
              "quality": "240p",
              "id": "0579f68f-b6e4-4958-8563-845cf438dff3",
              "fps": 29
            },
            {
              "profile": 164,
              "quality": "360p",
              "id": "8640a08a-04a3-4588-8542-a2fa1673799d",
              "fps": 29
            },
            {
              "profile": 175,
              "quality": "1080p",
              "id": "b431d6da-566f-4041-9cfa-2fcb4cb73b5e",
              "fps": 29
            },
            {
              "profile": 174,
              "quality": "720p",
              "id": "bf34cc62-11e8-46c7-a131-e5d8861381ad",
              "fps": 29
            }
          ],
          "streams_avc": [
            {
              "profile": 165,
              "quality": "540p",
              "id": "1e8afd0b-359d-4518-8eb5-b74055174db8",
              "fps": 29
            },
            {
              "profile": 139,
              "quality": "240p",
              "id": "0579f68f-b6e4-4958-8563-845cf438dff3",
              "fps": 29
            },
            {
              "profile": 164,
              "quality": "360p",
              "id": "8640a08a-04a3-4588-8542-a2fa1673799d",
              "fps": 29
            },
            {
              "profile": 175,
              "quality": "1080p",
              "id": "b431d6da-566f-4041-9cfa-2fcb4cb73b5e",
              "fps": 29
            },
            {
              "profile": 174,
              "quality": "720p",
              "id": "bf34cc62-11e8-46c7-a131-e5d8861381ad",
              "fps": 29
            }
          ],
          "default_cdn": "akfire_interconnect_quic"
        },

        "progressive": [
          {
            "profile": "174",
            "width": 1280,
            "mime": "video/mp4",
            "fps": 29,
            "url": "https://vod-progressive.akamaized.net/exp=1666665765~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2361%2F19%2F486807090%2F2181471195.mp4",
            "cdn": "akamai_interconnect",
            "quality": "720p",
            "origin": "gcs",
            "height": 720
          },
          {
            "profile": "139",
            "width": 426,
            "mime": "video/mp4",
            "fps": 29,
            "url": "https://vod-progressive.akamaized.net/exp=1666665765~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2361%2F19%2F486807090%2F2181471197.mp4",
            "cdn": "akamai_interconnect",
            "quality": "240p",
            "origin": "gcs",
            "height": 240
          },
          {
            "profile": "165",
            "width": 960,
            "mime": "video/mp4",
            "fps": 29,
            "url": "https://vod-progressive.akamaized.net/exp=1666665765~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2361%2F19%2F486807090%2F2181471178.mp4",
            "cdn": "akamai_interconnect",
            "quality": "540p",
            "origin": "gcs",
            "height": 540
          },
          {
            "profile": "164",
            "width": 640,
            "mime": "video/mp4",
            "fps": 29,
            "url": "https://vod-progressive.akamaized.net/exp=1666665765~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2361%2F19%2F486807090%2F2181471188.mp4",
            "cdn": "akamai_interconnect",
            "quality": "360p",
            "origin": "gcs",
            "height": 360
          },
          {
            "profile": "175",
            "width": 1920,
            "mime": "video/mp4",
            "fps": 29,
            "url": "https://vod-progressive.akamaized.net/exp=1666665765~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2361%2F19%2F486807090%2F2181477054.mp4",
            "cdn": "akamai_interconnect",
            "quality": "1080p",
            "origin": "gcs",
            "height": 1080
          }
        ]
      },
      "lang": "en",
      "sentry": {
        "url": "https://6f5f8e1cecfa40fb850f578b69fc1705@o189131.ingest.sentry.io/1297650",
        "enabled": false,
        "debug_enabled": true,
        "debug_intent": 0
      },
      "thumb_preview": {
        "url": "https://videoapi-sprites.vimeocdn.com/video-sprites/image/11a44afd-ad2b-4dd5-bd69-640a8d1351cd.0.jpeg?ClientID=player-backend-prod",
        "frame_width": 426,
        "height": 2880.0,
        "width": 4260,
        "frame_height": 240,
        "frames": 120,
        "columns": 10
      },
    "view": 1,
    "vimeo_url": "vimeo.com"
  };</script>
                  </body>
               </html>
            </iframe>
         </div>
         <div class="autoplay-cover">
            <p>Autoplaying next video in <span class="big-text">10</span> seconds...</p>
            <div><button class="btn">Cancel</button> <button class="btn btn-blue">Go</button></div>
         </div>
      </div>
   </body>
</html>
</video-player>
</body>
</html>
**/