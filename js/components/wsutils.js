export default class WS {
    constructor(url, dispatcher) {
        this.websocket = new WebSocket(`ws://${url}`)
        
        this.websocket.onmessage = event => {
            dispatcher(JSON.parse(event.data))
        }
    }

    sendMsg(text, type='INDEX') {
        let msg = JSON.stringify({
            type,
            text
        })
        setTimeout(() => this.websocket.readyState == 1?this.websocket.send(msg):sendMsg(text, type), 1000)
    }
    
    close() {
        this.websocket.close()
    }
}
