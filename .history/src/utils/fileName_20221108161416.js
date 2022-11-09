// const fs = require("fs");
const files = require.context('../', true, /\.ifc$/);
let pages = [];
files.keys().forEach(key => {
    let k= key.replace(/(\.\/|\.js)/g, '')
    pages.push(files(key).default)
})

let fileNames = pages
export default fileNames;