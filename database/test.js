var readLine = require('lei-stream').readLine;
var writeLine = require('lei-stream').writeLine;
const mysql = require('mysql');
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

var table_name = 'user_video_act'

var inputFile = './MOOCCube/additional_information/' + table_name + '.json';
var outputFile = './MOOCCube/additional_information/' + table_name + 'x.json';

var output = writeLine(outputFile);
var counter = 0;
var startTime = Date.now();

function msToS(v) {
    return parseInt(v / 1000, 10);
}

function getSpentTime() {
    return Date.now() - startTime;
}
readLine(inputFile).go(function (data, next) {
    counter++;
    // if (counter <= 1) {
    // var str = '{"name":"lxh","add":"China"}';
    // 字符串转化为Object 
    var obj = eval('(' + data + ')');
    // 判断obj类型
    typeof (obj)
    // 获取转换后的对象
    // var entry = Object.entries(obj);
    // 获取转换后对象的key
    // var key = Object.keys(obj);
    var id = obj.id
    var act = obj.activity
    for (var i in act) {
        var course_id = act[i].course_id
        var video_id = act[i].video_id
        var watching_count = act[i].watching_count
        var video_duration = act[i].video_duration
        var local_watching_time = act[i].local_watching_time
        var video_progress_time = act[i].video_progress_time
        var video_start_time = act[i].video_start_time
        var video_end_time = act[i].video_end_time
        var local_start_time = act[i].local_start_time
        var local_end_time = act[i].local_end_time
        // if (course_id == null) { course_id = '' } if (v2 == null) { v2 = '' } if (v3 == null) { v3 = '' } if (v4 == null) { v4 = '' }

        // 执行插入sql语句
        // const sql = "insert into " + table_name + " (`id`,`name`,`en`,`explanation`) values (" + "'" + v1 + "'" + "," + "'" + v2 + "'" + "," + "'" + v3 + "'" + "," + "'" + v4 + "'" + ")"
        const sql = "insert into " + table_name + " (`user_id`,`course_id`,`video_id`,`watching_count`,`video_duration`,`local_watching_time`,`video_progress_time`,`video_start_time`,`video_end_time`,`local_start_time`,`local_end_time`) values (" + "'" + id + "'" + "," + "'" + course_id + "'" + "," + "'" + video_id + "'" + "," + "'" + watching_count + "'" + "," + "'" + video_duration + "'" + "," + "'" + local_watching_time + "'" + "," + "'" + video_progress_time + "'" + "," + "'" + video_start_time + "'" + "," + "'" + video_end_time + "'" + "," + "'" + local_start_time + "'" + "," + "'" + local_end_time + "'" + ")"

        connection.query(sql, (err, result) => {
            if (err) {
                console.error('error', result, err);
                return
            }
        })

        // console.log(key, obj['id'], obj['activity'][1], obj['activity'][2])
    }
    // }
    output.write(data, next);
    if (counter % 10000 === 0) {
        printSpeedInfo();
    }
}, function () {
    console.log('end');
    output.end(function () {
        console.log('done. total %s lines, spent %sS', counter, msToS(getSpentTime()));
        printMemoryUsage();
        process.exit();
    });
});

// 打印进度
function printSpeedInfo() {
    var t = msToS(getSpentTime());
    var s = counter / t;
    if (!isFinite(s)) s = counter;
    console.log('read %s lines, speed: %sL/S', counter, s.toFixed(0));
}

// 打印内存占用情况
function printMemoryUsage() {
    var info = process.memoryUsage();
    function mb(v) {
        return (v / 1024 / 1024).toFixed(2) + 'MB';
    }
    console.log('rss=%s, heapTotal=%s, heapUsed=%s', mb(info.rss), mb(info.heapTotal), mb(info.heapUsed));
}
setInterval(printMemoryUsage, 1000);
setInterval(printSpeedInfo, 1000);
// connection.end()