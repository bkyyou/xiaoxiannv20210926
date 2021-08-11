/**
 * 主要就是分两种 电脑 和 手机端
 */

const pcBaseSize = {
  width: 100,
  heigh: 100
}

const phoneBaseSize = {
  width: 50,
  heigh: 50
}

let baseSize;

// if (screentWidth > screenSize) {
screentWidth > screenSize ? baseSize = pcBaseSize : baseSize = phoneBaseSize
// }