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
const teachersSchema = mongoose.Schema({
    position:String,
    num:Number,
})
const studentsSchema = mongoose.Schema({
    name:String,
    value:Number,
})
const workersSchema = mongoose.Schema({
    name:String,
    value:Number,
})
const inNumSchema = mongoose.Schema({
    name:String,
    value:Number,
    could:Number,
})
const flowRateSchema = mongoose.Schema({
    name:String,
    inValue:Number,
    outValue:Number,
})
const emergencySchema = mongoose.Schema({
    name:String,
    value:Number,
})
const maintenanceSchema = mongoose.Schema({
    name:String,
    value:Number,
})
/************** 定义模型Model **************/
const Models = {
    Login: mongoose.model('Login', loginSchema),
    Test: mongoose.model('tt', testSchema, "testData"),
    TeacherTotal: mongoose.model('tolTeachers',teachersSchema,"Teachers"),
    Student: mongoose.model('student',studentsSchema,"Students"),
    Worker: mongoose.model('worker',workersSchema,'Workers'),
    InNum: mongoose.model('inNum',inNumSchema,"InNum"),
    FlowRate: mongoose.model('flowRate',flowRateSchema,'FlowRate'),
    Emergency: mongoose.model('emergency',emergencySchema,'Emergency'),
    Maintenance: mongoose.model('maintenance',maintenanceSchema,'Maintenance')
}

module.exports = Models;
