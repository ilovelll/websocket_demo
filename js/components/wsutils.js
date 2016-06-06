export default class WS {
    constructor(url, dispatcher) {
        this.websocket = new WebSocket(`ws://${url}`)
        
        this.websocket.onmessage = event => {
            dispatcher(JSON.parse(event.data))
        }
    }

    sendMsg(text, type='INDEX') {
        this.websocket.send(
           JSON.stringify({
               type,
               text
           }) 
        )
    }
    
    close() {
        this.websocket.close()
    }
}
