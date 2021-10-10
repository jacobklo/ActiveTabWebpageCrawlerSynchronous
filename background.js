var Cur_id = ''
var Cur_html = ''
// output to allProcessedData
var AllProcessedData = {};

// ajaxRequestData is what you pass to the url: http://example.com?r=1
var UrlsToLoad = ['https://www.yahoo.com', 'https://www.yahoo.com.hk'];


// Create new Page, for data to load on it
var NewPage = browser.tabs.create({
  url: 'https://www.yahoo.com'
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
function handleMessage(request) {
  Cur_html = request.html;
  console.log(Cur_id, Cur_html);
}

browser.runtime.onMessage.addListener(handleMessage);


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
      // Inject a listener to send html code back to here
      browser.tabs.executeScript(Cur_id, {
        code: `document.body.style.border = "5px solid red";
           var sending = browser.runtime.sendMessage({
             html: document.documentElement.innerHTML
           });`
      });

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

browser.webRequest.onResponseStarted.addListener(
  async (details) => {
    if (details.tabId < 0) {
      return;
    }
    const tab = await browser.tabs.get(details.tabId);

    
  },
  {
    types: ["xmlhttprequest"],
    urls: [
      //"http://* /*.m3u8",
      //"https://* /*.m3u8",
      //"http://* /*.m3u8?*",
      //"https://* /*.m3u8?*",
    ],
  }
);













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
