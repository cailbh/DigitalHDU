// const fs = require("fs");
import fs from 'fs'
var folder =  path.resolve('/models')
console.log(folder)
fs.readdir(folder, function(err, files) {
    var count = 0
    var checkEnd = function() {
      ++count == files.length && callback()
    }
 
    files.forEach(function(file) {
      var fullPath = folder + '/' + file;
 
      fs.stat(fullPath, function(err, stats) {
        if (stats.isDirectory()) {
            return readDirRecur(fullPath, checkEnd);
        } else {
          /*not use ignore files*/
          if(file[0] == '.') {
 
          } else {
            fileList.push(fullPath)            
          }
          checkEnd()
        }
})
fileNames = JSON.stringify(tmp)

export default fileNames;