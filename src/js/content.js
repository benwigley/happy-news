console.log('HappyNews Extension Loaded');

(function($) {
  chrome.runtime.onMessage.addListener(function(message, sender, callback) {
    // console.log('message', message);
    var state = message.state;

    var $divs = $('h1, h2, h3, h4, h5, h6, p, li');

    var toggleDiv = function(div, turnOff) {
      var $div = $(div);
      if (turnOff) {
        $div.css({
          'opacity': '0.04'
        })
      } else {
        $div.css({
          'transition': 'opacity 200ms',
          'opacity': ''
        })
      }
    }

    var rejectWordsRegex = new RegExp(window.rejectWordsRegex, 'i');

    for (var i = 0; i < $divs.length; i++) {
      var $div = $($divs[i]);

      if ($div.text().match(rejectWordsRegex)) {
        toggleDiv($div, state);
        $div.hover(function() {
          toggleDiv(this, false);
        }, function() {
          toggleDiv(this, true);
        });
      }
    }

    callback({ status: state });
  });
})(jQuery)
