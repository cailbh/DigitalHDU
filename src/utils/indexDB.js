//用于存储数据库
var db; 
//打开数据表
var request = window.indexedDB.open("webDB", 1); 

request.onerror = function (event) {console.log("数据库打开报错");};

request.onsuccess = function (event) {
    db = request.result;
    //db = event.target.result; 也能拿到
    console.log("数据库打开成功");

	//查找是否已经缓存了模型，
	//若有直接从缓存中加载，否则去缓存模型
	testOwnModel();
};

//定义表结构
request.onupgradeneeded = function (event) {
    db = event.target.result;
    console.log("数据库升级成功");
    
    var objectStore;
    if (!db.objectStoreNames.contains("book")) {
        objectStore = db.createObjectStore("book", {keyPath: "id",});
        // 定义存储对象的数据项
        objectStore.createIndex("id", "id", {unique: true,});
        objectStore.createIndex("name", "name");
        objectStore.createIndex("model", "model");
    }
};
function testOwnModel(){
    var transaction = db.value.transaction("book", "readwrite");
    var store = transaction.objectStore("book");
    var dataRequest = store.index("id").get(80);
 
    dataRequest.onsuccess = function (e) {
        
        //如果获取到了缓存模型，直接加载模型
        if (e.target.result != undefined) {
            //创建blob对象路径。​
            var url2 = URL.createObjectURL(e.target.result.model);
            //去加载模型
            loadModel(url2);
        }
        else { //否则去请求并缓存
            ElMessage('模型首次加载缓存中，请稍后！')
            var ajax = new XMLHttpRequest();
            ajax.open("get", modelURL);
            ajax.send();
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    //一定要处理成二进制
                    let blob = new Blob([ajax.responseText]);
                    //向数据库中添加请求回来的模型
                    add({id: 80,  name: "焊接场景", model: blob});
                    testOwnModel();
                }
            };
        }
    };
 }
     
 //向表中添加数据
 function add(book) {
     var request1 = db
         .transaction(["book"], "readwrite") //新建事务，readwrite, readonly(默认), versionchange
         .objectStore("book") //拿到IDBObjectStore 对象
         .add({
             // 插入记录
             id: book.id,
             name: book.name,
             model: book.model,
         });
         
     request1.onsuccess = function (event) {console.log("数据写入成功");};
     request1.onerror = function (event) {console.log("数据写入失败");};
     request1.onabort = function (event) {console.log("事务回滚");};
 }
 