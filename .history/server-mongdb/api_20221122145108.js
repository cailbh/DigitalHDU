/* eslint-disable no-unused-vars */
// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();


router.post('/api/test/createData', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models.Login({
        account: req.body.account,
        password: req.body.password
    });
    // 保存数据newAccount数据进mongoDB
    newAccount.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('createAccount successed');
        }
    });
});
// 获取已有账号接口
router.get('/api/test/getData', (req, res) => {
    // 通过模型去查找数据库
    models.Test.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
             
            res.send(data);
        }
    });
});
// 获取教师占比接口
router.get('/api/teachers/getData', (req, res) => {
    // 通过模型去查找数据库
    models.TeacherTotal.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
             
            res.send(data);
        }
    });
});
// 获取生源地占比接口
router.get('/api/students/getData', (req, res) => {
    // 通过模型去查找数据库
    models.Student.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
             
            res.send(data);
        }
    });
});
// 获取教职工占比接口
router.get('/api/workers/getData', (req, res) => {
    // 通过模型去查找数据库
    models.Worker.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
             
            res.send(data);
        }
    });
});
// 获取在寝人数接口
router.get('/api/inNum/getData', (req, res) => {
    // 通过模型去查找数据库
    models.InNum.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
             
            res.send(data);
        }
    });
});
// 获取出入流量接口
router.get('/api/flowRate/getData', (req, res) => {
    // 通过模型去查找数据库
    models.FlowRate.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
             
            res.send(data);
        }
    });
});
// 获取出入流量接口
router.get('/api/emergency/getData', (req, res) => {
    // 通过模型去查找数据库
    models.Emergency.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
             
            res.send(data);
        }
    });
});
// 获取维保记录接口
router.get('/api/maintenance/getData', (req, res) => {
    // 通过模型去查找数据库
    models.Maintenance.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
             
            res.send(data);
        }
    });
});
// 获取user-course_net connection的信息
router.get('/api/user-course_net/getData', (req, res) => {
    // 通过模型去查找数据库
    models.Net.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
router.get('/api/net/getData', (req, res) => {
    // 通过模型去查找数据库
    models.Net.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
router.get('/api/cube/getNum', (req, res) => {
    console.log("req", req.query, "req")
    // 通过模型去查找数据库
    models.Cube.find().count((err, data) => {
        if (err) {
            res.send(err);
        } else {
             
            res.send([data]);
        }
    });
});
router.get('/api/cube/searchCubeMsg', (req, res) => {
    console.log("req", req.query, "req")
    var pageNum = req.query['page']
    var pageSize = req.query['pagesize']
    console.log(pageSize, pageNum)
    const aggregate = [
        {
            "$project":
            {
                "_id": 0,
                "userName": 1,
                "courseName": 1,
                "conceptName": 1,
                //   "cnt": {"$size": '$seq'}
            }
        },
        //  {"$sort": {"cnt": -1}},
        // {"$match": {"cnt": {"$gt": 300, "$lte": 1000}}},
        { "$skip": (parseInt(pageNum) - 1) * parseInt(pageSize) },
        { "$limit": parseInt(pageSize) }
    ]
    // 通过模型去查找数据库
    models.Cube.aggregate(aggregate).then((err, data) => {
        if (err) {
            res.send(err);
            console.log(err)
        } else {
            res.send([data]);
        }
    });
});
module.exports = router;