import { LoopQueue, MyLoopQueue } from "./utils";
import { loadScript, loadLink } from "./utils";

class RrwebControl {
  private MAX_COUNT:number
  private queue:any
  constructor() {
    this.MAX_COUNT = 100;
    this.queue = null;
  }
  instance(RRWEB_COUNT:number = 100) {
    if (RRWEB_COUNT < 0) { throw new Error('RRWEB_COUNT 必须设置大于0') }
    this.MAX_COUNT = RRWEB_COUNT || 100;
    this.queue = this.MAX_COUNT <= 10 ? new LoopQueue() : new MyLoopQueue(this.MAX_COUNT);
    this.loadRrweb()
  }
  public loadRrweb() {
    loadLink("https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css");
    loadScript(
      "https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js"
    ).then(() => {
      this.initRecord();
    });
  }
  private initRecord() {
    window.rrweb.record({
      emit(event:any) {
        if (this.queue.getSize() >= this.MAX_COUNT) {
          this.queue.dequeue();
        }
        this.queue.enqueue(event);
      }
    });
  }
  async getEventRecord() {
    return this.queue.getQueue();
  }  
}

const rrwebControl = new RrwebControl()

export default rrwebControl