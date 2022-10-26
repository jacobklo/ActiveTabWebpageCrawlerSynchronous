// ==UserScript==
// @name         ToMarkdown
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Jacob Lo
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_log
// ==/UserScript==


let run = function() {
  document.copy = function() {
    navigator.clipboard.writeText(document.copyText);
  };

  let turndownService = new TurndownService();
  let articleStr = $('article').prop('outerHTML');
  let markdown = turndownService.turndown(articleStr);
  document.copyText = markdown;

  let copyButton = $('<button onclick="document.copy()">Copy Article</button>');
  $('body').prepend(copyButton);
};



(function() {
  'use strict';

  window.addEventListener("load", function() {
    // delay to run this script to wait all DOM loaded
    setTimeout(run, 500);
  }, false);
})();


/**
Below code is copied directly from turndown.js because adding external script will cause CORS
https://unpkg.com/turndown/dist/turndown.js

MIT License
Copyright (c) 2017 Dom Christie
**/
var TurndownService = (function () {
... ...
}());
