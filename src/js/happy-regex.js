(function() {

  var averageWords = [
    'arrest',
    'criminal',
    'criminals'
  ];

  var rejectWords = [
    'died',
    'dies',
    'murder',
    'murderer',
    'trapped',
    'stabbed',
    'stabbing',
    'knifed',
    'knifes',
    'killer',
    'kills',
    'killed',
    'fatal',
    'crashes',
    'victim',
    'rapist',
    'rape',
    'death',
    'dead',
    'overdose',
    'massacre',
    'bombs',
    'slaughter',
    'manslaughter',
    'collision',
    'injuries',
    'drowned',
    'drowning'
  ];

  var regexString = '';

  for (var i = 0; i < rejectWords.length; i++) {
    var word = rejectWords[i];
    regexString += ("\\b" + word + "\\b");

    if (i !== rejectWords.length - 1) {
      regexString += '|';
    }
  };

  window.rejectWordsRegex = regexString;
})();