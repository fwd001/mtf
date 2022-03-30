import { TouchCenter } from './touch-center';
import type { Options, TCParams } from './type';

// export type TC = TouchCenter;
export type TC = {
  destory: () => void;
};

/**
 * 初始化
 * @param selector 选择器 string
 * @param options 配置项 { bindProp, feedbackClass }
 * @returns 点击反馈实例
 */
export const mtf = function (selector: string, options?: Options): TC {
  const { bindProp = 'data-mtf', feedbackClass = 'feedback' } = options || {};
  const parms: TCParams = {
    selector,
    options: {
      bindProp,
      feedbackClass,
    },
  };
  return new TouchCenter(parms);
};
