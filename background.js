var Cur_id = Number.MIN_SAFE_INTEGER;
var All_HTMLs = {};
// output to allProcessedData
var AllProcessedData = {};
// ajaxRequestData is what you pass to the url: http://example.com?r=1
var UrlsToLoad = ['https://my.headspace.com/player/16?startIndex=0'];


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
  All_HTMLs[request.url] = request.html;
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
var promiseRecursive = (urlsToLoad, index) => {
  if (index >= urlsToLoad.length) {
    return;
  }
  setTimeout(() => {
    var page = browser.tabs.update(Cur_id, {
      url: urlsToLoad[index]
    });
    page.then(() => {
      promiseRecursive(urlsToLoad, index + 1);
    })
    // $.ajax({
    //   url: finvizURL
    //   , data: ajaxRequestData[index]
    //   , success: (response) => {
    //     getFinvizTable(response, index);
    //     promiseRecursive(index + 1);
    //   }
    // });
  }, 10000);
}


// Call this to run:
promiseRecursive(UrlsToLoad, 0);

/*



var getFinvizTable = (html, index) => {
  console.log('Page done : ', index);

  // Get table items rows:
  let $tbody = $(html).find('.screener-link-primary:eq(0)').parent().parent().parent();
  $tbody.find('tr:gt(0)').each((i, row) => {
    let stockInfo = {};

    $(row).find('td').each((j, col) => {

      // Get table title : No. 	Ticker 	Company 	Sector...
      let colName = $('tbody:eq(20) td:eq(' + j + ')').text();
      let colValue = $(col).text();
      stockInfo[colName] = colValue;
    });

    allProcessedData[stockInfo["No."]] = stockInfo;
  })

};


*/
