// ==UserScript==
// @name         jQuery Injector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  jQuery Injector
// @author       You
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


/**
The following code will not work, as CORS errors
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
// ... give time for script to load, then type (or see below for non wait option)
jQuery.noConflict();



So, you need to import all code directly, locally.
Download https://code.jquery.com/jquery-3.6.1.min.js
Open that jquery-3.6.1.min.js in text editor
Copy all code to below
**/

!function(e,t){"use strict"; /*......*/ };
