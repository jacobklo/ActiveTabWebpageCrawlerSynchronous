
const baseURL = 'https://www.hkcards.com/cj/cj-char-';

// output to allProcessedData
var allProcessedData = {};

// ajaxRequestData is what you pass to the url: http://example.com?r=1
var ajaxRequestData = [];
var words = [];
for (let i = 16868; i < 40919; i++) {
  ajaxRequestData.push(baseURL + String.fromCodePoint(i) + '.html');
  words.push(String.fromCodePoint(i));
}

var handleCode = (html, index) => {
  
  var imgcj = $(html).find('img.img-fluid.mt-2')
  var imgurl = '';
  if (imgcj.length > 0) {
    imgurl = imgcj[0].baseURI
  }
  var cj = $(html).find('div.col-xl-5 p')
  var charkeys = '';
  if (cj.length > 0) {
    charkeys = cj[1].innerText
  }
  
  if (charkeys.length) {
    allProcessedData[words[index]] = [charkeys, imgurl];
  }
  console.log('Page done : ', index+16868, words[index], allProcessedData[words[index]]);

};


// For each data in ajaxRequestData, we will get the html webpage code, and call helper function()
// Each ajax request is waited, and only go to next ajax request if this succeed.
var promiseRecursive = (index) => {
  if (index >= ajaxRequestData.length) {
    return;
  }
  setTimeout(() => { 
    $.ajax({
      url: ajaxRequestData[index]
      , success: (response) => {
        handleCode(response, index);
        promiseRecursive(index + 1);
      }
    });
  }, 1010);
}

// This is how to start stock crawler
promiseRecursive(0)
