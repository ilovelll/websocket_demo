'use strict';

const http = require('http')
const url = require('url')
const fs = require('fs')
const WebSocketServer = require('ws').Server

const handle = require('./backend/wshandler')

//a simple http server
const server = http.createServer((request, response) => {
  let pathname = url.parse(request.url).pathname
  let ext = pathname.match(/(\.[^.]+|)$/)[0];//取得后缀名
  switch (ext) {
    case ".css":
    case ".js":
      fs.readFile("." + request.url, 'utf-8', (err, data) => {//读取内容
        if (err) console.log(err)
        response.writeHead(200, {
          "Content-Type": {
            ".css": "text/css",
            ".js": "application/javascript",
          }[ext]
        })
        response.write(data)
        response.end()
      })
      break;
    default:
      fs.readFile('./index.html', 'utf-8', (err, data) => {//读取内容
        if (err) console.log(err)
        response.writeHead(200, {
          "Content-Type": "text/html"
        })
        response.write(data)
        response.end()
      })
  }
})

server.listen(8888)


const wss = new WebSocketServer({server})
console.log("websocket server created")

wss.on("connection", ws => {
  let location = url.parse(ws.upgradeReq.url, true)
  // use location.query.access_token to authenticate
  // or ws.upgradeReq.headers.cookie
 
  console.log("websocket connection open")

  ws.on("close", () => {
    console.log("websocket connection close")
    // clearInterval(init)
  })
  ws.on('message', msg => handle(ws, msg))
})
