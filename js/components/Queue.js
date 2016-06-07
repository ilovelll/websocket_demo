export default class Queue {
   constructor(length = 20) {
       this.length = length
       this.queue = []
   }
   push(item) {
       if(this.length === this.queue.length) this.queue.shift()
       this.queue.push(item)
   }
   clear() {
       this.queue = []
   }
}