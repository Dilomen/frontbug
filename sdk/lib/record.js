import { LoopQueue, MyLoopQueue } from './utils';
const CONFIG_COUNT = 50
const MAX_COUNT = CONFIG_COUNT || 100
const queue = MAX_COUNT <= 10 ? new LoopQueue() : new MyLoopQueue(MAX_COUNT);
export function initRecord() {
  rrweb.record({
    emit(event) {
      if (queue.getSize() >= MAX_COUNT) {
        queue.dequeue()
      }
      queue.enqueue(event)
    }
  });
}

export async function getEventRecord() {
  return queue.getQueue()
}

