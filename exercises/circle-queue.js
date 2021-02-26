// class CircleQueue {
//   constructor(bufferSize) {
//     this.buffer = new Array(bufferSize).fill(null);
//     this.nextPosition = 0;
//     this.oldestPosition = 0;
//   }

//   enqueue(arg) {
//     if (this.buffer[this.nextPosition] !== null && !this.endOfQueue()) {
//       this.buffer[this.nextPosition] = arg;

//       this.oldestPosition += 1;

//     } else if (this.buffer[this.nextPosition] !== null && this.endOfQueue()) {
//       this.buffer[this.nextPosition] = arg;
//       this.oldestPosition = 0;
//     } else {
//       this.buffer[this.nextPosition] = arg;
//     }

//     if (this.endOfQueue()) {
//       this.nextPosition = 0;
//     } else {
//       this.nextPosition += 1;
//     }
//   }

//   dequeue() {
//     if (this.atEndOfQueue(this.oldestPosition)) {
//       let value = this.buffer[this.oldestPosition];
//       this.buffer[this.oldestPosition] = null;
//       this.oldestPosition = 0;
//       return value; 
//     } else if (!this.atEndOfQueue(this.position) && this.buffer[this.oldestPosition] !== null) {
//       let value = this.buffer[this.oldestPosition];
//       this.buffer[this.oldestPosition] = null;
//       this.oldestPosition += 1;
//       return value;
//     } else {
//       return null;
//     }
//   }

//   endOfQueue() {
//     return this.nextPosition + 1 > this.buffer.length - 1
//   }

//   isQueueFull() {
//     return this.buffer.every(value => value !== null);
//   }

//   atEndOfQueue(position) {
//     return position === this.buffer.length - 1;

//   }
// }

class CircularQueue {
  constructor(size) {
    this.buffer = new Array(size).fill(null);
    this.nextPosition = 0;
    this.oldestPosition = 0;
  }

  enqueue(object) {
    if (this.buffer[this.nextPosition] !== null) {
      this.oldestPosition = this.increment(this.nextPosition);
    }
    this.buffer[this.nextPosition] = object;
    this.nextPosition = this.increment(this.nextPosition);
  }

  dequeue() {
    let value = this.buffer[this.oldestPosition];
    this.buffer[this.oldestPosition] = null;
    if (value !== null) {
      this.oldestPosition = this.increment(this.oldestPosition);
    }
    return value;
  }

  increment(position) {
    return (position + 1) % this.buffer.length;
  }
}

let queue = new CircularQueue(3);
queue.enqueue("a")
console.log(queue.buffer);
console.log(queue.nextPosition);
console.log(queue.oldestPosition);
console.log();

queue.enqueue("b")
console.log(queue.buffer);
console.log(queue.nextPosition);
console.log(queue.oldestPosition);
console.log();

queue.enqueue("c")
console.log(queue.buffer);
console.log(queue.nextPosition);
console.log(queue.oldestPosition);
console.log();

queue.enqueue("d")
console.log(queue.buffer);
console.log(queue.nextPosition);
console.log(queue.oldestPosition);
console.log();

queue.enqueue("e")
console.log(queue.buffer);
console.log(queue.nextPosition);
console.log(queue.oldestPosition);
console.log();

queue.enqueue("f")
console.log(queue.buffer);
console.log(queue.nextPosition);
console.log(queue.oldestPosition);
console.log();

console.log("\n" + queue.dequeue());
console.log(queue.buffer);
console.log(queue.nextPosition);
console.log(queue.oldestPosition);
console.log();

// console.log("\n" + queue.dequeue());
// console.log(queue.buffer);
// console.log(queue.nextPosition);
// console.log(queue.oldestPosition);
// console.log();

// console.log("\n" + queue.dequeue());
// console.log(queue.buffer);
// console.log(queue.nextPosition);
// console.log(queue.oldestPosition);
// console.log();

// console.log("\n" + queue.dequeue());
// console.log(queue.buffer);
// console.log(queue.nextPosition);
// console.log(queue.oldestPosition);
// console.log();

