document.body.style.border = "5px solid red";

setTimeout(() => {
  var sending = browser.runtime.sendMessage({
    url: document.URL
    , html: document.documentElement.innerHTML
  });
}, 5000);



