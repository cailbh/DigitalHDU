//sqlMap.js
var sqlMap = {
    // 测试
    admin_user: {
        add: 'insert into admin_user(loginname,password) values(?, ?)'
    },
    reader: {
        add: 'insert into reader(name) values (?)',
        delete: 'delete from reader where name = ?',
        search: 'select * from reader where name = ?', //查找读者信息
        borrowBook: 'update reader set lendBook1 = ? where name = ?'//更新用户表中的已借阅书籍
    },
    book: {
        add: 'insert into book(name, author, stock) values (?, ?, ?)',
        search: 'select * from book where name = ?',
        borrowBook: 'update book set stock = ? , lendNum = ? where name = ?'//更新书籍表中的库存
    },
    course: {
        searchId: 'select * from course where id = ?',
        searchName: 'select * from course where name = ?'
    },
    cube: {
        searchMsg: 'select * from cube_biggest_2019 LIMIT ? , ?',
        countMsg: 'select count(*) from cube_biggest_2019'
    }
}
module.exports = sqlMap;
