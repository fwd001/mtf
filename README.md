<!--
 * @Author: wedong.fu
 * @Date: 2022-01-20 18:05:47
 * @LastEditors: wedong.fu
 * @LastEditTime: 2022-03-30 17:21:19
 * @Description: 请填写简介
-->
# mtf
## 介绍

mtf.js 是用来解决 h5 在触摸反馈上的不足的一个 JS 库，一切逻辑都在 2kb 中实现。
原生小程序可使用 `hover-class="bg_red"`
https://developers.weixin.qq.com/miniprogram/dev/component/view.html

1. 支持所有移动端流行浏览器
2. 反应灵敏, 没有 300ms 延迟
3. 使用简单
4. 体积小，仅 2kb

## 特点

[在线 demo 演示](https://qr-tool-v.huolala.work/#/mtf)

![](https://coupe-static.huolala.cn/image/93eb76c3ffec2c5c54f40a353bf240b7718ee305.gif?x-oss-process=image/resize,w_300,limit_0)

## 快速上手

```sh
yarn add mtf  --registry=https://registry-npm-next.huolala.work
# or
npm install mtf  --registry=https://registry-npm-next.huolala.work
```

### 启用反馈监控

1. 指定一个父元素或者 body 作为监控范围。
2. 给需要反馈的元素加上`data-mtf="true"`
3. 添加反馈样式，class 名默认为 feedback

```html
<style>
  .touch {
    height: 100px;
    background: #699f00;
    text-align: center;
    line-height: 100px;
    font-size: 30px;
    color: #fff;
  }
  .touch.feedback {
    background: #38f;
  }
</style>
<div className="btn-group">
  <div className="touch" onClick="{jumpMpBtn}" data-mtf="true">有反馈</div>
  <div className="touch" onClick="{jumpMpBtn}">没有反馈</div>
</div>

import { mtf } from 'mtf'; 
mounted() { const f = mtf('.btn-group') }
```

## API

### 初始化

mtf(selector, options);

### 参数

options

- feedbackClass {String}: 指定触发反馈时添加&删除的 className
- bindProp {String}: 指定触发 dom 绑定属性

### 方法

    const feedback = mtf(selector, options);
    feedback.destory();

- destory: 销毁监控

#### 参考：https://github.com/backToNature/touchFeedback
