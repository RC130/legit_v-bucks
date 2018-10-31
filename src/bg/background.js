function tabIsRealVbuckSite(taburl) {
  const url = new URL(taburl);
  if (url.hostname == "www.epicgames.com" || url.hostname == "store.playstation.com" || url.hostname == "www.microsoft.com") {
    return true;
  }

  return false;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// This is dumb, but ¯\_(ツ)_/¯
function randPage(pages) {
  var page = getRandomInt(pages.length);
  return "src/browser_action/" + pages[page] + ".html";
}

function randomNoGif() {
  const noPages = ["no1","no2","no3","no4","no5","no6"];
  return randPage(noPages);
}

function randomYesGif() {
  const yesPages = ["yes1","yes2","yes3","yes4","yes5"];
  return randPage(yesPages);
}

function checkForVBuckScam(tabId, changeInfo, tab) {
  chrome.tabs.getSelected(null,function(activeTab) {
    var iconPath = "../../icons/no.png";
    var titleString = "No, you can't buy V-Bucks here!";
    var popupPage = randomNoGif();
    if (tabIsRealVbuckSite(activeTab.url)) {
      iconPath = "../../icons/yes.png";
      titleString = "Yes, this is a legit V-Buck site" ;
      popupPage = randomYesGif();
    }
    chrome.browserAction.setIcon({
      path : iconPath
    });
    chrome.browserAction.setTitle({
      title : titleString
    });
    chrome.browserAction.setPopup({
      popup: popupPage
    });
  });
}

chrome.tabs.onUpdated.addListener(checkForVBuckScam); 
chrome.tabs.onActivated.addListener(checkForVBuckScam); 
