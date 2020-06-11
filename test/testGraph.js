const assert = require("chai").assert;
const {Queue, getDirectedData, bfs} = require("../src/graph.js");

describe('Queue', () => {
  describe('enqueue', () => {
    it('should add the element into the queue', () => {
      const queue = new Queue();
      queue.enqueue(3);
      assert.isNotOk(queue.isEmpty);
    });
    it('should not add the element in the queue if it is already present', () => {
      const queue = new Queue();
      queue.enqueue(3);
      queue.enqueue(3);
      queue.dequeue;
      assert.isOk(queue.isEmpty);
    });
  });

  describe('dequeue', () => {
    it('should return undefined when queue is empty', () => {
      const queue = new Queue();
      const actual = queue.dequeue;
      const expected = undefined;
      assert.strictEqual(actual, expected);
    });
    it("should return the first element of the queue if queue is not empty", () => {
      const queue = new Queue();
      queue.enqueue(3);
      queue.enqueue(4);
      assert.strictEqual(queue.dequeue, 3);
    })
  });

  describe('isEmpty', () => {
    it('should return true if queue is empty', () => {
      const queue = new Queue();
      assert.isOk(queue.isEmpty, true);
    });
    it('should return false if queue is not empty', () => {
      const queue = new Queue();
      queue.enqueue(3);
      assert.isNotOk(queue.isEmpty, true);
    });
  });
})

describe('getDirectedData', () => {

  it('should return the object with unique key which includes it neighbor', () => {
    const pairs = [['a', 'b'], ['b', 'c']];
    const actual = getDirectedData(pairs);
    console.log(actual);
    const expected = {a: ['b'], b: ['c']};
    assert.deepStrictEqual(actual, expected);
  });
  it('should add the multiple neighbors to its unique parent', () => {
    const pairs = [['a', 'b'], ['b', 'c'], ['a', 'm'], ['b', 'n']];
    const actual = getDirectedData(pairs);
    const expected = {a: ['b', 'm'], b: ['c', 'n']};
    assert.deepStrictEqual(actual, expected);
  });

});

describe('bfs', () => {

  it('should return true if the path is available', () => {
    const pairs = [['a', 'b'], ['b', 'c']];
    assert.isTrue(bfs(pairs, 'a', 'c'));
  });
  it('should return false if the path is not available', () => {
    const pairs = [['a', 'b'], ['b', 'c']];
    assert.isFalse(bfs(pairs, 'b', 'a'));
    assert.isFalse(bfs(pairs, 'c', 'b'));
    assert.isFalse(bfs(pairs, 'c', 'a'));
  });
  it('should return false if source is not in the pairs', () => {
    const pairs = [['a', 'b'], ['b', 'c']];
    assert.isFalse(bfs(pairs, 'm', 'a'));
  });
  it('should return false if target is not in the pairs', () => {
    const pairs = [['a', 'b'], ['b', 'c']];
    assert.isFalse(bfs(pairs, 'a', 'm'));
  });
});