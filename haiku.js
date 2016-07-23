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

function formatDataByWords(data){    
   var lines = data.toString().split("\n"),
       lineSplit
   var sylArr = [];
   lines.forEach(function(line){    
    lineSplit = line.split("  ");
    if(lineSplit[1] != null){   
      var sylCount = numOfSyllables(lineSplit[1]);
      sylArr[lineSplit[0]] = sylCount;
    }
  });
  return sylArr;   
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

//Given a text and a lexicon dictionary, find 
//Haikus that are naturally found in the text
//Return Array of Haikus
//Format given as [ 5, 7, 5 ]
function findHaiku(textArr, dictArr, format){
  var haikuArr = [], sylCount; //array to be returned, syllable count
  var wordArrSyl = textArr.map(function(word){ //returns textArr as number of syllables
    var wordCaps = word.toUpperCase();
    return dictArr[wordCaps];
  });
  for(var i = 0; i < textArr.length; i++){
    var str = "";
    var indexAdd = 0;
    var works = true;
    for(var j = 0; j< format.length; j++){
      sylCount = format[j];
      var count = 0;
      while(count < sylCount){
        if(wordArrSyl[i + indexAdd] == undefined){
          count = 9999;
          break;
        }
        count += wordArrSyl[i + indexAdd];
        str += textArr[i + indexAdd] + " ";
        indexAdd++;
      }
      if(count > sylCount){
        works = false;
        break;
      }
      str += "\n";
    }
    if(works){
      haikuArr.push(str);
    }
  };
  return haikuArr;
}

module.exports = {
    createHaiku: createHaiku,
    readCmudictFile: readCmudictFile,
    formatData: formatData,
    formatDataByWords: formatDataByWords,
    findHaiku: findHaiku,
};
