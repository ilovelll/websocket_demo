'use strict';
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const spider = require('./c1')
const db = require('./dbserver')

if (cluster.isMaster) {
    let workerNum = 0, upgradeNum = 0 //记录当前进程数量和更新任务数量
    spider.getLatest()
        .then(result => {
            let {latest, now} = result
            for (var i = 0; i < numCPUs; i++) {
                if (latest - now > 0) {
                    cluster.fork().send(++now)
                    workerNum++
                } else {
                    console.log({msg:"暂无更新"})
                    process.exit(0)
                }
            }
            cluster.on('online', (worker, code, signal) => {
                console.log(`The worker #${worker.process.pid} has started`)
            })
            cluster.on('disconnect', (worker) => {
                console.log(`The worker #${worker.process.pid} has disconnected`)
                if(--workerNum === 0){
                    console.log(`任务结束,共更新: ${upgradeNum}个主题`)
                    process.exit(0)
                } 
            })
            cluster.on('message', (worker, message, handle) => {
                if (!message.success) {
                    console.log('####restart job:', message.id, '#####')
                    worker.send(message.id)
                } else {
                    upgradeNum++
                    latest - now > 0 ? worker.send(++now) : worker.kill()
                }
            })

        }).catch(err => {
            console.log(err)
        })
} else {
    process.on('message', msg => spider.scrapeByID(msg))
}