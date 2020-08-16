export function loadScript(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.async = true;
    script.src = src;

    script.onload = resolve;
    script.onerror = (error) =>
      reject(new Error('Unable to load ' + src + ': ' + error));

    document.body.appendChild(script);
  });
}

export function loadLink(href) {
  return new Promise((resolve, reject) => {
    let link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';

    link.onload = resolve;
    link.onerror = (error) =>
      reject(new Error('Unable to load ' + href + ': ' + error));

    document.body.appendChild(link);
  });
}

export class MyLoopQueue {
  constructor(capacity = 10) {
    this.front = 0
    this.tail = 0
    this.size = 0
    this.Queue = new Array(capacity);
  }

  getSize() {
    return this.size;
  }

  enqueue(E) {
    const queueLength = this.Queue.length;
    const tail = this.tail % queueLength;
    // 如果队列满了，那么就将"第一位"变成"最后一位"
    if (this.tail === this.front && this.getSize() !== 0) {
      this.front = (this.front + 1) % queueLength;
    }
    this.tail = (this.tail + 1) % queueLength;
    this.Queue[tail] = E;
    this.size++;
  }

  dequeue() {
    const queueLength = this.Queue.length;
    // 如果队列为空，就不能出列了
    if (this.getSize() === 0 && this.front % queueLength === this.tail) {
      throw new Error("Can't get empty queue");
    }
    const ret = this.Queue[this.front];
    this.Queue[this.front] = null;
    this.front = (this.front + 1) % queueLength;
    this.size--;
    return ret;
  }

  getQueue() {
    let newQueue = [];
    const length = this.Queue.length;
    if (this.getSize() < length) {
      newQueue = this.Queue.slice(0, this.tail);
    } else if (this.font === 0) {
      newQueue = this.Queue;
    } else {
      let frontQueue = this.Queue.slice(this.front);
      let tailQueue = this.Queue.slice(0, this.front);
      newQueue = [...frontQueue, ...tailQueue];
    }
    return newQueue;
  }
}

export class LoopQueue {
  constructor() {
    this.Queue = [];
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  enqueue(E) {
    this.Queue.push(E);
    ++this.size;
  }
  dequeue() {
    this.Queue.shift();
    --this.size;
  }
  getQueue() {
    return this.Queue;
  }
}
