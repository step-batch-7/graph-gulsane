const assert = require("chai").assert;
const {Queue, getDirectedData, bfs} = require("../src/graph.js");

describe('Queue', () => {
  describe('enqueue', () => {
    it('should add the element into the queue', () => {
      const queue = new Queue([]);
      queue.enqueue(3);
      assert.isNotOk(queue.isEmpty);
    });
    it('should not add the element in the queue if it is already present', () => {
      const queue = new Queue([]);
      queue.enqueue(3);
      queue.enqueue(3);
      queue.dequeue;
      assert.isOk(queue.isEmpty);
    });
  });

  describe('dequeue', () => {
    it('should return undefined when queue is empty', () => {
      const queue = new Queue([]);
      const actual = queue.dequeue;
      const expected = undefined;
      assert.strictEqual(actual, expected);
    });
    it("should return the first element of the queue if queue is not empty", () => {
      const queue = new Queue([]);
      queue.enqueue(3);
      queue.enqueue(4);
      assert.strictEqual(queue.dequeue, 3);
    })
  });

  describe('isEmpty', () => {
    it('should return true if queue is empty', () => {
      const queue = new Queue([]);
      assert.isOk(queue.isEmpty, true);
    });
    it('should return false if queue is not empty', () => {
      const queue = new Queue([]);
      queue.enqueue(3);
      assert.isNotOk(queue.isEmpty, true);
    });
  });
})

describe('getDirectedData', () => {

  it('should return the object with unique key which includes it neighbor', () => {
    const pairs = [['a', 'b'], ['b', 'c']];
    const actual = getDirectedData(pairs);
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

describe('bfs', function () {
  it('single node not connected to itself', function () {
    const paths = [['aa', 'bb']]
    assert.isFalse(bfs(paths, 'aa', 'aa'));
    assert.isFalse(bfs(paths, 'aa', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'bb'));
  });
  it('single node connected to itself', function () {
    const paths = [['aa', 'bb'], ['aa', 'aa'],];
    assert.isTrue(bfs(paths, 'aa', 'aa'));
    assert.isFalse(bfs(paths, 'aa', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'bb'));
  });
  it('two nodes not connected', function () {
    const paths = [['aa', 'bb'], ['cc', 'dd'],];
    assert.isFalse(bfs(paths, 'bb', 'bb'));
    assert.isFalse(bfs(paths, 'aa', 'cc'));
    assert.isFalse(bfs(paths, 'aa', 'dd'));
    assert.isFalse(bfs(paths, 'bb', 'cc'));
    assert.isFalse(bfs(paths, 'cc', 'aa'));
    assert.isFalse(bfs(paths, 'cc', 'bb'));
    assert.isTrue(bfs(paths, 'cc', 'dd'));
    assert.isTrue(bfs(paths, 'aa', 'bb'));
  });
  it('two nodes perfectly connected', function () {
    const paths = [['aa', 'bb'], ['bb', 'aa']];
    assert.isTrue(bfs(paths, 'bb', 'bb'));
    assert.isTrue(bfs(paths, 'bb', 'aa'));
    assert.isTrue(bfs(paths, 'aa', 'aa'));
    assert.isTrue(bfs(paths, 'aa', 'bb'));
  });
  it('two nodes sparsely connected', function () {
    const paths = [['aa', 'bb'], ['bb', 'cc'],];
    assert.isTrue(bfs(paths, 'aa', 'bb'));
    assert.isTrue(bfs(paths, 'bb', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'cc'));
    assert.isFalse(bfs(paths, 'cc', 'bb'));
    assert.isFalse(bfs(paths, 'cc', 'aa'));
    assert.isFalse(bfs(paths, 'bb', 'aa'));
  });
  it('three nodes sparsely connected', function () {
    const paths = [['aa', 'bb'], ['bb', 'cc'], ['cc', 'dd']];
    assert.isTrue(bfs(paths, 'aa', 'bb'));
    assert.isTrue(bfs(paths, 'bb', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'dd'));
    assert.isFalse(bfs(paths, 'cc', 'bb'));
    assert.isFalse(bfs(paths, 'cc', 'aa'));
    assert.isFalse(bfs(paths, 'bb', 'aa'));
    assert.isFalse(bfs(paths, 'dd', 'cc'));
    assert.isFalse(bfs(paths, 'dd', 'aa'));
  });
  it('three nodes moderately connected', function () {
    const paths = [['aa', 'bb'], ['bb', 'cc'], ['cc', 'bb']];
    assert.isTrue(bfs(paths, 'aa', 'bb'));
    assert.isTrue(bfs(paths, 'bb', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'cc'));
    assert.isTrue(bfs(paths, 'cc', 'bb'));
    assert.isTrue(bfs(paths, 'cc', 'cc'));
    assert.isTrue(bfs(paths, 'bb', 'bb'));
    assert.isFalse(bfs(paths, 'bb', 'aa'));
    assert.isFalse(bfs(paths, 'aa', 'aa'));
  });
  it('three nodes perfectly connected', function () {
    const paths = [['aa', 'bb'], ['bb', 'cc'], ['cc', 'aa']];
    assert.isTrue(bfs(paths, 'aa', 'bb'));
    assert.isTrue(bfs(paths, 'bb', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'cc'));
    assert.isTrue(bfs(paths, 'cc', 'bb'));
    assert.isTrue(bfs(paths, 'cc', 'cc'));
    assert.isTrue(bfs(paths, 'bb', 'bb'));
    assert.isTrue(bfs(paths, 'bb', 'aa'));
    assert.isTrue(bfs(paths, 'aa', 'aa'));
  });
});