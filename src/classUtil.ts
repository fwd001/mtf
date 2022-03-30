export const hasClass = (elem: HTMLElement, cls: string = '') => {
  if (!elem) return false;
  if (cls.replace(/\s/g, '').length === 0) return false;
  return new RegExp(` ${cls} `).test(` ${elem.className} `);
};

export const addClass = (elem: HTMLElement, cls: string = '') => {
  if (!hasClass(elem, cls)) {
    elem.className += ` ${cls}`;
  }
};

export const removeClass = (elem: HTMLElement, cls: string = '') => {
  if (hasClass(elem, cls)) {
    let newClass = ` ${elem.className.replace(/[\t\r\n]/g, '')} `;
    while (newClass.indexOf(` ${cls} `) >= 0) {
      newClass = newClass.replace(` ${cls} `, ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
};

export const closest = (elem: HTMLElement, attribute?: string) => {
  if (!elem) return false;
  let cur: HTMLElement;
  for (cur = elem; cur; cur = cur.parentNode as HTMLElement) {
    if (
      cur.nodeType < 11 &&
      cur.nodeType === 1 &&
      cur.getAttribute(attribute || 'data-mtf') === 'true'
    ) {
      break;
    }
  }
  return cur;
};
