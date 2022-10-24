var util = require('util');
var events = require('events');
var fs = require('fs');

var counter = 0;
var startTime = Date.now();
var table_name = 'user_video_act'
var inputFile = './MOOCCube/additional_information/' + table_name + '.json';
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

function msToS(v) {
    return parseInt(v / 1000, 10);
}

function getSpentTime() {
    return Date.now() - startTime;
}

function ReadStreamThrottle(stream, speed) {
    this._stream = stream;
    this._readBytes = 0;
    this._speed = speed;
    this._ended = false;
    this._readBytesSecond = 0;
    this._lastTimestamp = Date.now();
    this._paused = false;
    var self = this;

    // 检查速度是否太快
    function isTooFast() {
        var t = (Date.now() - self._lastTimestamp) / 1000;
        var bps = self._readBytesSecond / t;
        return bps > speed;
    }

    // 每隔一段时间检查速度
    function checkSpeed() {
        if (isTooFast()) {
            self.pause();
            // 直到平均速度放缓到预设的值时继续读流
            var tid = setInterval(function () {
                if (!isTooFast()) {
                    clearInterval(tid);
                    self.resume();
                }
            }, 100);
        } else {
            self.resume();
        }
    }

    stream.on('data', function (chunk) {
        self._readBytes += chunk.length;
        self._readBytesSecond += chunk.length;
        self.emit('data', chunk);
        checkSpeed();
    });

    stream.on('end', function () {
        self._ended = true;
        self.emit('end');
    });
}

util.inherits(ReadStreamThrottle, events.EventEmitter);

ReadStreamThrottle.prototype.pause = function () {
    this._paused = true;
    this._stream.pause();
};

ReadStreamThrottle.prototype.resume = function () {
    this._paused = false;
    this._stream.resume();
};


// 读取文件，限制速度不大于10MB/S
var MB = 1024 * 1024;
var readStream = new ReadStreamThrottle(fs.createReadStream(inputFile), MB * 0.4);

var dataBuffer = new Buffer.from('')
var bytes = 0;
// var t = Date.now();
readStream.on('data', function (data) {
    bytes += data.length;
    counter++;
    dealData(data)
    if (counter % 10000 === 0) {
        printSpeedInfo();
    }
});
readStream.on('end', function () {
    console.log('end. total %s bytes', bytes);
});

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
// eslint-disable-next-line no-unused-vars
var line_num = 0
function dealData(data) {
    readStream.pause();//暂停读取
    dataBuffer = Buffer.concat([dataBuffer, data]);
    var separate = "\n";//分隔符
    var index = dataBuffer.indexOf(separate);
    var lineBuffer;//行数据缓存
    var len;
    while (index > -1) {
        line_num++
        len = index + separate.length;
        lineBuffer = dataBuffer.slice(0, len);
        //处理每一行数据

        var obj = eval('(' + lineBuffer.toString() + ')');
        typeof (obj)
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
        }
        // }
        // console.log(lineBuffer.toString())
        dataBuffer = dataBuffer.slice(len, dataBuffer.length);

        index = dataBuffer.indexOf(separate);
    }
    // if (counter == 1) {
    //     console.log(dataBuffer.toString())
    // }
    readStream.resume();//恢复读取文件
}