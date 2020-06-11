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

const getDirectedData = function (pairs) {
  const directedData = {};
  pairs.forEach(pair => {
    if (directedData[pair[0]]) {
      directedData[pair[0]].push(pair[1]);
    } else {
      directedData[pair[0]] = [pair[1]];
    }
  })
  return directedData;
}

const bfs = function (pairs, source, target) {
  const directedData = getDirectedData(pairs.slice());
  const queue = new Queue();
  queue.enqueue(source);
  const visitedNeighbors = [];

  while (!queue.isEmpty) {
    const node = queue.dequeue;
    visitedNeighbors.push(node);
    if (node === target) {
      return true;
    }
    const neighbors = directedData[node];
    if (neighbors) {
      neighbors.forEach(neighbor => {
        if (!visitedNeighbors.includes(neighbor)) {
          queue.enqueue(neighbor);
        }
      })
    }
  }
  return false;
};

module.exports = {Queue, getDirectedData, bfs};
