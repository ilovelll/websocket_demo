const db = require('./dbserver.js')
const spawn = require('child_process').spawn;

module.exports = function handle(ws, msg) {
    try {
        msg = JSON.parse(msg)
    } catch (error) {
       console.log('Wrong json format') 
    }
    switch (msg.type) {
        case 'INDEX':
            db.getImgs(msg.pageIndex)
                .then(docs => {
                    console.log('send imgs')
                    ws.send(JSON.stringify({ type: 'list', docs }))
                })
                .catch(err => console.log(err))
            break;
        case 'START':
            const p1 = spawn('node', ['./server/multi_task.js'])
            p1.stdout.on('data', (data) => {
                console.log(`stdout1: ${data}`)
            })
            p1.stderr.on('data', (data) => {
                console.log(`stderr1: ${data}`)
            })
            break;
    }
}
