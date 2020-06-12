//Example 
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to 
// Should return true.


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
  const queue = directedData[source] || [];
  const visitedNeighbors = [];

  while (queue.length > 0) {
    const node = queue.shift();
    visitedNeighbors.push(node);
    if (node === target) {
      return true;
    }
    const neighbors = directedData[node];
    if (neighbors) {
      neighbors.forEach(neighbor => {
        if (!visitedNeighbors.includes(neighbor)) {
          queue.push(neighbor);
        }
      })
    }
  }
  return false;
};


module.exports = {getDirectedData, bfs};
