# Active Tab Webpage Crawler

## Definitons

Some website only some information after you login.\
"Active tab" means this crawler will run inside a browser, which should works with any web UI. 

## Benefits

What you see is what you can crawl.\
Pure HTML or Shadow DOM data is pulled, as if you are viewing the webpage.

## Disadvantage

Cannot pull large amount of data in a very short time.\
Too many webpage request / RESTful pull request may resulting your IP being blocked.

## Prerequisite

Browser like Chrome, Firefox\
Browser development console\
(Optional) jQuery. ( You can use tampermonkey extension to sideload script files into webpages. checkout /tampermonkey/jQuery.js)

# Pure HTML and RESTful processing crawler

This is good for static-ish webpages.\
A sign for these webpages are\
1. usually very structure, where using jQuery between pages is very simple
2. each data for each webpages can be access through Url, either direct *.html, or RESTful

## Example

[Dictionary.com/](https://www.dictionary.com/)

You can access different vocabs directly from the Urls.\
(https://www.dictionary.com/browse/banana)\
(https://www.dictionary.com/browse/admin)

## Steps
I will use [hkcards](https://www.hkcards.com/) and [Finviz](https://finviz.com/) as an example.

### 1. Understand how to request data from Urls
(https://www.hkcards.com/cj/cj-char-丁.html)\
(https://www.hkcards.com/cj/cj-char-解.html)\
(https://www.hkcards.com/cj/cj-char-點.html)\

(https://finviz.com/screener.ashx?v=111&f=idx_sp500&ft=4&o=-marketcap&r=1)\
(https://finviz.com/screener.ashx?v=111&f=idx_sp500&ft=4&o=-marketcap&r=21)

### 2. Query the data you need inside the webpage
![Get the info you need to crawl on 1 page](/assets/readme1.PNG)

### 3. Write the logic to navigate to all Urls

This is case by case. Using dictionary.com as an example.\

``` Javascript
const baseURL = 'https://www.dictionary.com/browse/';

// ajaxRequestData is what you pass to the url: http://example.com?r=1
var ajaxRequestData = [];

for (let w of words) {
  ajaxRequestData.push(baseURL + w);
}
```

### 4. re-write the code to handle your data
Just plug your step 2 code into the script

### 5. Copy the whole script into Browser dev console to let it run
![Run the code](/assets/readme3.PNG)

### 6. Save your data into a json file
You call allProcessedData variable in the dev console, than right-click "Copy Object" to save it.
![Copy Object in Dev console](/assets/readme2.PNG)

# Non-RESTful dynamic webpage crawler

Some webpages only load data when you click a button, and cannot request data directly from Urls.\
Those are harder to crawl.
