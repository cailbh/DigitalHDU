// Schema、Model、Entity或者Documents的关系:Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 
mongoose.connect('mongodb://localhost:27017/digitalHDU');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
/************** 定义模式Schema **************/
const loginSchema = mongoose.Schema({
    account: String,
    password: String
});
const testSchema = mongoose.Schema({
    account: String,
    password: String
});
const netSchema = mongoose.Schema({
    net: Array,
    userMap: Object,
    userMaps: Object,
    courseMap: Object,
    courseMaps: Object,
    scatter: Object,
    edges: Array,
    nodes: Array,
    idOrder: Object
})

const cubeSchema = mongoose.Schema({
    user_id: String,
    video_id: String,
    segment: Array,
    ccid: String,
    concept_id: String,
    course_id: String,
    userName: String,
    courseName: String,
    conceptName: String
})
/************** 定义模型Model **************/
const Models = {
    Login: mongoose.model('Login', loginSchema),
    Test: mongoose.model('tt', testSchema, "testData"),
    // Net: mongoose.model('Net', netSchema, 'user-course_net')
    Net: mongoose.model('Net', netSchema, 'user-course_concept_net'),
    Cube: mongoose.model('Cube', cubeSchema, 'cubeB')
}

module.exports = Models;
