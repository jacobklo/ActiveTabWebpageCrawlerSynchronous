// ==UserScript==
// @name         Mutation Observer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let run = function() {
  $( "body" ).prepend( "<h1>Video LINKK</h1>" );
  console.log("JJJ");


  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        console.log(mutation)
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            // element added to DOM
            var hasClass = [].some.call(mutation.addedNodes, function(el) {
                return el.classList.contains('vp-center')
            });
            if (hasClass) {
                // element has class `MyClass`
                console.log('element ".vp-center" added');
            }
        }
    });
  });

  var config = {
    attributes: true,
    childList: true,
    characterData: true
  };

  observer.observe(document.body, config);
};

(function() {
    'use strict';

    window.addEventListener("load", function() {

        setTimeout(run, 1000);
    }, false);



})();