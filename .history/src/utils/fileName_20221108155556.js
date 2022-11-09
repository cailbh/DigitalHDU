var fs = require('fs');
const fs = require("fs");
let tmp = []
let fileNames = ''
let HtmlPages = [] // 文件夹下的所有文件
const files = fs.readdirSync('./public/models/')
files.forEach(function (item, index) {
    // 这里取las文件和txt
    if(item.indexOf('.las') >=0||item.indexOf('.txt') >=0){
        tmp.push(item.substring(0,item.indexOf('.')))//去掉后缀名
    }
})
fileNames = JSON.stringify(tmp)

export default fileNames;