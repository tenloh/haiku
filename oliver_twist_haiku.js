var haiku = require('./haiku');

//Read Oliver Twist and CMUDict text files
var olivTwist = haiku.readCmudictFile('./oliver_twist.txt'); 
var cmudictFile = haiku.readCmudictFile('./cmudict.txt');

//Parse into Syllables Array for the CMU Dictionary
var arr = haiku.formatDataByWords(cmudictFile);

//Parse into word array of Oliver Twist text
var regExp = /[a-zA-Z]+/gi;
var wordArr = olivTwist.match(regExp);


var haikuArr = haiku.findHaiku(wordArr, arr, [5,7,5]);
console.log(haikuArr[6422]);





