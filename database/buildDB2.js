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
    // 建立entities表
    // ###############################
    var table_name = 'user'
    const data = fs.readFileSync('./MOOCCube/entities/' + table_name + '.json', 'utf8');
    const config = JSON.parse(data);
    console.log(config.length)
    for (var i in config) {
        var v1 = config[i].id
        var v2 = config[i].name
        var v3 = config[i].course_order
        var v4 = config[i].enroll_time
        if (v1 == null) { v1 = '' } if (v2 == null) { v2 = '' } if (v3 == null) { v3 = '' } if (v4 == null) { v4 = '' }

        // 执行插入sql语句
        // const sql = "insert into " + table_name + " (`id`,`name`,`en`,`explanation`) values (" + "'" + v1 + "'" + "," + "'" + v2 + "'" + "," + "'" + v3 + "'" + "," + "'" + v4 + "'" + ")"
        const sql = "insert into " + table_name + " (`id`,`name`,`course_order`,`enroll_time`) values (" + "'" + v1 + "'" + "," + "'" + v2 + "'" + "," + "'" + v3 + "'" + "," + "'" + v4 + "'" + ")"

        connection.query(sql, (err, result) => {
            if (err) {
                console.error('error', result, err);
                return
            }
        })
        if (i == config.length - 1) {
            console.log("finish！")
        }

    }
    // ##################################

    // 建立user_act表
    // ##################################
    // var table_name = 'user_video_act'
    // const data = fs.readFileSync('./MOOCCube/additional_information/' + table_name + '.json', 'utf8');
    // const config = JSON.parse(data);
    // console.log(config[1], config.length)
    // for (var i in config) {
    //     var v1 = config[i].id
    //     var v2 = config[i].name
    //     var v3 = config[i].course_order
    //     var v4 = config[i].enroll_time
    //     if (v1 == null) { v1 = '' } if (v2 == null) { v2 = '' } if (v3 == null) { v3 = '' } if (v4 == null) { v4 = '' }

    //     // 执行插入sql语句
    //     // const sql = "insert into " + table_name + " (`id`,`name`,`en`,`explanation`) values (" + "'" + v1 + "'" + "," + "'" + v2 + "'" + "," + "'" + v3 + "'" + "," + "'" + v4 + "'" + ")"
    //     const sql = "insert into " + table_name + " (`id`,`name`,`course_order`,`enroll_time`) values (" + "'" + v1 + "'" + "," + "'" + v2 + "'" + "," + "'" + v3 + "'" + "," + "'" + v4 + "'" + ")"

    //     connection.query(sql, (err, result) => {
    //         if (err) {
    //             console.error('error', result, err);
    //             return
    //         }
    //     })
    //     if (i == config.length - 1) {
    //         console.log("finish！")
    //     }

    // }
    // ######################################
} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}

connection.end()
