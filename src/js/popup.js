
window.onload = function() {
  chrome.tabs.getSelected(function(tab) {

    loader = document.getElementById('page-spinner');

    if (!navigator.onLine) {
      loader.style.display = 'none';
      offline = document.getElementById('offline');
      offline.style.display = 'block';
      // return;
    }

    if (window.production) {
      var baseSrc = 'http://tweetmention.com';
    } else {
      var baseSrc = 'http://dev.tweetmention.com';
    }

    var tabUrl = encodeURIComponent(tab.url);
    var tabTitle = encodeURIComponent(tab.title);

    iframe = document.getElementById('extension-iframe');
    iframe.src = baseSrc + '?url=' + tabUrl + '&title=' + tabTitle;
    // console.log(tab);

    var showiFrame = function() {
      iframe.className = iframe.className + ' in';
      loader.style.display = 'none';
    };

    iframe.onload = showiFrame;

    /*
      Listen to message events from the TweetMention iframe
    */
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var onMsg = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    onMsg(messageEvent,function(e) {
      if (e.data === 'close-extension') {
        window.close();
      }
      else if (e.data === 'load-extension') {
        showiFrame();
      }
    },false);

  });

  console.log('sending message');
  chrome.extension.sendMessage({
    type: "color-divs"
  });
};