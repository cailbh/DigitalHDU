//userApi.js
var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        })
    } else {
        res.json(ret)
    }
}

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.admin_user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.loginname, params.password], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
})

// 增加用户接口
router.post('/addReader', (req, res) => {
    var sql = $sql.reader.add
    var params = req.body
    console.log(params)
    conn.query(sql, [params.name], function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            jsonWrite(res, result)
        }
    })
})

router.post('/cancelReader', (req, res) => {
    var sql = $sql.reader.delete
    var params = req.body
    console.log(params)
    conn.query(sql, [params.name], function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            jsonWrite(res, result)
        }
    })
})

router.get('/searchReader', (req, res) => {
    var sql = $sql.reader.search
    var params = req.query
    console.log(params)
    conn.query(sql, [params.name], function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            console.log(result)
            res.send(result)
        }
    })
})

router.post('/readerBorrow', (req, res) => {
    var sql = $sql.reader.borrowBook
    var params = req.body
    console.log(params)
    conn.query(sql, [params.readerName, params.bookName], function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            jsonWrite(res, result)
        }
    })
})

module.exports = router
