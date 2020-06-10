//Example 
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to 
// Should return true.

class Queue {
  constructor () {
    this.queue = [];
  }
  enqueue(element) {
    if (element && !this.queue.includes(element)) {
      this.queue.push(element);
    }
  }
  get dequeue() {
    return this.queue.shift();
  }
  get isEmpty() {
    return this.queue[0] ? false : true;
  }
}

const bfs = function (pairs, source, target) {
  
};

module.exports = {Queue, bfs};
