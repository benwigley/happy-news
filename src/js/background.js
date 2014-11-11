// Config

var debug = true;


// Globals

var tabsStateLookup = {};

var log = function() {
  if (!debug) return;
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  };
  console.log('-------');
};

var activeImgPath = {
  '19': 'icons/19x19.png',
  '38': 'icons/38x38.png'
};
var inactiveImgPath = {
  '19': 'icons/19x19_gray.png',
  '38': 'icons/38x38_gray.png'
};

var setIconState = function(state) {
  var iconObject = {};
  if (state) {
    iconObject['path'] = activeImgPath;
  } else {
    iconObject['path'] = inactiveImgPath;
  }
  chrome.browserAction.setIcon(iconObject, function() {
    log('icon set');
  });
};


// Detect extension button click

chrome.browserAction.onClicked.addListener(function() {

  // Send current state to content script
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    // Set active state
    var tabState = tabsStateLookup[tabs[0].id] = !(tabsStateLookup[tabs[0].id]);

    // Update icon
    setIconState(tabState)

    chrome.tabs.sendMessage(tabs[0].id, { state: tabState }, function(response) {
      log('response', response);
    });
  });
});


// Detect tab change - Reset extention button

chrome.tabs.onActivated.addListener(function(tab, changeInfo) {

  // Set active state
  var isCurrentTabActive = !!(tabsStateLookup[tab.tabId]);

  setIconState(isCurrentTabActive);
});
