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


router.get('/searchCubeMsg', (req, res) => {
    var sql = $sql.cube.searchMsg
    var params = req.query
    var page = parseInt((params.page - 1) * params.pagesize)
    var pagesize = parseInt(params.pagesize)
    console.log(params)
    conn.query(sql, [page, pagesize], function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            console.log(result)
            res.send(result)
        }
    })
})

router.get('/countCubeMsg', (req, res) => {
    var sql = $sql.cube.countMsg
    // var params = req.body
    console.log(sql)
    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            jsonWrite(res, result)
        }
    })
})

module.exports = router
