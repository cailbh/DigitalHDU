const mysql = require('mysql');
const fs = require('fs');
// 数据库连接信息
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'mooccube'
})
// 建立连接
connection.connect();
// 读取json文件
try {
    // 建立relations表
    // ###############################
    var table_name = 'video_concept'
    const data = fs.readFileSync('./MOOCCube/relations/' + table_name + '.json', 'utf8');
    const config = JSON.parse(data);
    console.log(config.length)
    for (var i in config) {
        var v1 = config[i].id
        var v2 = config[i].con_id
        if (v1 == null) { v1 = '' } if (v2 == null) { v2 = '' }

        // 执行插入sql语句
        // const sql = "insert into " + table_name + " (`id`,`name`,`en`,`explanation`) values (" + "'" + v1 + "'" + "," + "'" + v2 + "'" + "," + "'" + v3 + "'" + "," + "'" + v4 + "'" + ")"
        const sql = "insert into " + table_name + " (`video_id`,`concept_id`) values (" + "'" + v1 + "'" + "," + "'" + v2 + "'" + ")"
        // if (i <= 100) {
        connection.query(sql, (err, result) => {
            if (err) {
                console.error('error', result, err);
                return
            }
        })
        // }
        if (i == config.length - 1) {
            console.log("finish！")
        }

    }
} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}

connection.end()
