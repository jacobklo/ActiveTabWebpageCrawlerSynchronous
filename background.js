browser.webRequest.onResponseStarted.addListener(
  async (details) => {
    if (details.tabId < 0) {
      return;
    }
    const tab = await browser.tabs.get(details.tabId);

    console.log(details)
    console.log(tab)
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

// output to allProcessedData
var allProcessedData = {};

// ajaxRequestData is what you pass to the url: http://example.com?r=1
var ajaxRequestData = [];
for (let k = 1; k < 3; k += 20) {
  ajaxRequestData.push({ "r": k });
}
const finvizURL = 'https://finviz.com/screener.ashx?v=111&f=idx_sp500&ft=4&o=-marketcap&';

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


// For each data in ajaxRequestData, we will get the html webpage code, and call helper function()
// Each ajax request is waited, and only go to next ajax request if this succeed.
var promiseRecursive = (index) => {
  if (index >= ajaxRequestData.length) {
    return;
  }
  setTimeout(() => {
    $.ajax({
      url: finvizURL
      , data: ajaxRequestData[index]
      , success: (response) => {
        getFinvizTable(response, index);
        promiseRecursive(index + 1);
      }
    });
  }, 10000);
}

// This is how to start stock crawler
promiseRecursive(0)
