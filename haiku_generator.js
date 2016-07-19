var haiku = require('./haiku');
var cmudictFile = haiku.readCmudictFile('./cmudict.txt');
var arr = haiku.formatData(cmudictFile);
console.log(haiku.createHaiku([[5],[7],[5]], arr));
console.log(haiku.createHaiku([[2,3],[2,3],[4]], arr));
