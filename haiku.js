/*
* This module will supply all the functions that is needed
* to generate a haiku. 
*
* The createHaiku function will take in inputs of a
* the structure in a format such as [[5], [7], [5]]
* and a syllablesArr, which contains a list of syllables
* available to use.
*/


var fs = require("fs");
var syllablesArr = []; //Will be a two dimensional array


//readCmudictFile reads from a file path and returns
//as a string
function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}


//formatData formats the data string into 
// an array object with word and # of syllables
function formatData(data){    
   var lines = data.toString().split("\n"),
       lineSplit
   lines.forEach(function(line){    
    lineSplit = line.split("  ");
    if(lineSplit[1] != null){   
      var sylCount = numOfSyllables(lineSplit[1]);
      if(syllablesArr[sylCount] == null){
        syllablesArr[sylCount] = [];
      }
      syllablesArr[sylCount].push(lineSplit[0]);
    }
  });
  return syllablesArr;   
}

//numOfSyallables returns amount of syllables given a layout
function numOfSyllables(layout){
  var match = layout.match(/\d/g);
  if(match == null) return 0;
  return match.length;
}



//createHaiku will take in a structure and syllables Array and
//Generate a random haiku that fits the structure
function createHaiku(structure, syllablesArray){
  var haiku = "";
  structure.forEach(function(arr){
    arr.forEach(function(syl){
      haiku += findWord(syl, syllablesArr) + " ";
    });
    haiku += '\n';
  });
  return haiku;
};


//Given a syllable count, find a random word
function findWord(syllables, sylArr){
  var length = sylArr[syllables].length;
  var index = Math.floor(Math.random() * length);
  return sylArr[syllables][index];
}

module.exports = {
    createHaiku: createHaiku,
    readCmudictFile: readCmudictFile,
    formatData: formatData,
};
