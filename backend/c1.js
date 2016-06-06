'use strict';
const cheerio = require('cheerio') // Basically jQuery for node.js
const iconv = require('iconv-lite')
const rp = require('request-promise')
const db = require('./dbserver.js')

exports.scrapeByID = id => { //这里还是用了desktop版，发现手机版时而和桌面版不同步
    rp({
        url: `http://www.meizitu.com/a/${id}.html`,
        encoding: null,
        transform: body => cheerio.load(iconv.decode(body, 'gb2312'))
    })
        .then($ => {
            console.log('Start crawler with ', id)
            let title = $('title')[0].children[0].data
            let keywords = $('meta[name="keywords"]')[0].attribs.content.split(',')
            let pics = $("#picture > p > img")
            let srcs = []
            for (let i = 0; i < pics.length; i++) {
                srcs.push(pics[i].attribs.src)
            }
            if (srcs.length > 0) {
                return db.insertDoc({ pid: id, keywords, title, srcs, weight: 1 })
                // return Promise.all(srcs.map(src=>{
                //     return rp({
                //         uri:src
                //     })
                // }))
            }
        })
        .then(result => {
            console.log(id, "抓取状态：", result)
            process.send({ id, success: true })
        })
        .catch(err => {
            console.log("请求出错", err)
            process.send({ id, success: false })
        })
}

// 获取数据库最新的和网站最新的数据
exports.getLatest = () => {
    let now, latest
    return new Promise((resolve, reject) => {
        db.getImgs(1, 1)
            .then(docs => {
                now = docs.length>0?docs[0].pid:5200
                return rp({
                    url: `http://m.meizitu.com`,
                    encoding: null,
                    transform: body => cheerio.load(iconv.decode(body, 'gb2312'))
                })
            })
            .then($ => {
                let imgurl = $(".am-gallery-item")[0].children[1].attribs.href
                let found = imgurl.match(/\d+/)
                if (found.length > 0) latest = parseInt(found[0])
                console.log('latest: ', latest, 'now: ', now)
                resolve({ now, latest })
            })
            .catch(err => reject(err))
    })
}