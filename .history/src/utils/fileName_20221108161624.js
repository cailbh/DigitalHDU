// const fs = require("fs");
const files = require.context('../../', true, /\.css$/);
let pages = [];
console.log(files)
files.keys().forEach(key => {
    console.log(key)
    // let k= key.replace(/(\.\/|\.js)/g, '')
    // pages.push(files(key).default)
})

let fileNames = pages
export default fileNames;