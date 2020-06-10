const assert = require("chai").assert;
const {Queue} = require("../src/graph.js");

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
