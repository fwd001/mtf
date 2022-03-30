import { closest, addClass, removeClass } from './classUtil';
import { TCParams } from './type';
export class TouchCenter {
  // 容器
  public container?: HTMLElement;
  // 绑定属性
  private bindProp?: string;
  // 反馈类
  private feedbackClass?: string;
  // 实例中心
  private eventData: any = {};
  // 点击移动抖动阈值
  private vague = 5;

  constructor(props: TCParams) {
    const { selector, options } = props;
    this.container = document.querySelector(selector) || undefined;
    if (!this.container) throw Error('请在组件挂载后初始化方法！！');
    this.bindProp = options.bindProp;
    this.feedbackClass = options.feedbackClass;
    this.initEventListener();
  }
  // 事件初始化
  private initEventListener() {
    if (!this.container) return;
    this.container.addEventListener('touchstart', this.fnStart.bind(this));
    this.container.addEventListener('touchmove', this.fnMove.bind(this));
    this.container.addEventListener('touchcancel', this.fnCancel.bind(this));
    this.container.addEventListener('touchend', this.fnCancel.bind(this));
  }
  // 销毁事件
  public destory() {
    if (!this.container) return;
    this.container.removeEventListener('touchstart', this.fnStart.bind(this));
    this.container.removeEventListener('touchmove', this.fnMove.bind(this));
    this.container.removeEventListener('touchcancel', this.fnCancel.bind(this));
    this.container.removeEventListener('touchend', this.fnCancel.bind(this));
  }
  // 开始点击事件
  private fnStart(e: TouchEvent) {
    const event: any = e.changedTouches ? e.changedTouches[0] : e;
    this.eventData[event.identifier] = {};
    const identifier: any = this.eventData[event.identifier];
    identifier.startY = event.pageY;
    identifier.startX = event.pageX;
    identifier.target = closest(event.target, this.bindProp);
    if (identifier.target) {
      addClass(identifier.target, this.feedbackClass);
    }
  }
  // 移动事件
  private fnMove(e: TouchEvent) {
    const event: any = e.changedTouches ? e.changedTouches[0] : e;
    const identifier = this.eventData[event.identifier];
    if (!identifier) return;
    if (
      event.target &&
      Math.abs(identifier.startY - event.pageY) > this.vague
    ) {
      removeClass(identifier.target, this.feedbackClass);
    }
  }
  // 取消事件
  private fnCancel(e: TouchEvent) {
    const event: any = e.changedTouches ? e.changedTouches[0] : e;
    const identifier = this.eventData[event.identifier];
    if (!identifier) return;
    if (identifier.target) {
      removeClass(identifier.target, this.feedbackClass);
    }
    delete this.eventData[event.identifier];
  }
}
