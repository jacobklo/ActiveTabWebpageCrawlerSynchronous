var crunchbaseURL = 'https://www.crunchbase.com/discover/principal.investors';

var allProcessedData = {};

var getInvestorTable = (html, index) => {
  console.log('Page done : ', index);

  // change to next page
  crunchbaseURL = "https://www.crunchbase.com/" + $(html).find('a.page-button-next:first').attr('href');

  // Get table header and get each column's name
  let $header = $(html).find('sheet-grid').find('grid-header').find('grid-column-header');
  let column = []

  $header.each((i, col) => {
    column.push($(col).text());
  });

  // Get table items rows:
  let $rows = $(html).find('sheet-grid').find('grid-row');
  $rows.each((i, row) => {
    let investorInfo = {};

    let $cells = $(row).find('grid-cell');
    $cells.each((j, cell) => {
      investorInfo[column[j]] = $(cell).text()
    });
    allProcessedData[investorInfo[column[1]]] = investorInfo;
  })

};

// For each data in ajaxRequestData, we will get the html webpage code, and call helper function()
// Each ajax request is waited, and only go to next ajax request if this succeed.
var promiseRecursive = (index) => {
  if (index >= 4116) {
    return;
  }
  setTimeout(() => {
    $.ajax({
      url: crunchbaseURL
      , data: ""
      , success: (response) => {
        getInvestorTable(response, index);
        promiseRecursive(index + 1);
      }
    });
  }, 10000);
}

// This is how to start stock crawler
promiseRecursive(0)
