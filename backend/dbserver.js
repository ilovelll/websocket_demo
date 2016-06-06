const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://192.168.1.115:27017/Johny';
// Use connect method to connect to the Server
const getConn = new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
        if (err) reject(new Error('数据库连接出错'))
        resolve(db)
    })
})

//插入数据库
exports.insertDoc = data => {
    return new Promise((resolve, reject) => {
        getConn.then(db => db.collection('meizitu').insertOne(data))
            .then(result => {
                resolve(result.result)
                // db.close()
            })
            .catch(err => {
                if (err.code && err.code == 11000) resolve({ ok: -1, msg: "数据库已抓取，请勿重复抓取" })
                else reject(err)
            })
    })
}

//获取图片
exports.getImgs = (pageInxex, pageSize=10) => {
    return new Promise((resolve, reject) => {
        getConn.then(db =>
            db.collection('meizitu')
                .find()
                .sort({ pid: -1 })
                .skip((pageInxex - 1) * pageSize)
                .limit(pageSize)
                .toArray()
        )
            .then(docs => {
                // db.close()
                resolve(docs)
            })
            .catch(err => {
                reject(err)
            })
    })
}
