var Cur_id = Number.MIN_SAFE_INTEGER;
var Current_index = 0;
var All_HTMLs = {};
// output to allProcessedData
var AllProcessedData = {};
// ajaxRequestData is what you pass to the url: http://example.com?r=1


// Create new Page, for data to load on it
var NewPage = browser.tabs.create({
  url: 'https://my.headspace.com'
  , active: true
});
NewPage.then(onNewPageCreated, onError);

function onNewPageCreated(tab) {
  console.log(`Created new tab: ${tab.id}`);
  Cur_id = tab.id;
}

function onError(error) {
  console.log(`Error: ${error}`);
}



// Handle the HTML from the new tab
function handleNewPageHTML(request) {
  //All_HTMLs[request.url] = request.html;
  console.log('Cur_html');
}
browser.runtime.onMessage.addListener(handleNewPageHTML);



// Once the webpage get m3u8 file, save the m3u8 file link into AllProcessedData
browser.webRequest.onResponseStarted.addListener(
  async (response_details) => {
    if (response_details.tabId != Cur_id) {
      console.log("ERROR", response_details.tabId);
      return;
    }
    
    AllProcessedData[response_details.originUrl] = response_details.url;
    console.log(response_details);

    Current_index += 1;
  },
  {
    types: ["xmlhttprequest"],
    urls: [
      "http://*/*.m3u8",
      "https://*/*.m3u8",
      //"http://*/*.m3u8?*",
      //"https://*/*.m3u8?*",
    ],
  }
);



// Recursively call one by one on each URL and load its data
var promiseRecursive = (index) => {
  if (index >= 10) {
    return;
  }
  var player = 101;
  setTimeout(() => {
    var page = browser.tabs.update(Cur_id, {
      url: 'https://my.headspace.com/player/' + player + '?startIndex=' + index

    });
    page.then(() => {
      promiseRecursive(Current_index);
    })
  }, 15000);
}


// Call this to run:
promiseRecursive(0);
