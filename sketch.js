let capture;

function setup() {
  createCanvas(windowWidth, windowHeight); // 建立全螢幕畫布
  background('#e7c6ff'); // 設定背景顏色為紫色
  capture = createCapture(VIDEO); // 啟用攝影機擷取影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示繪製的影像
}

function draw() {
  background('#e7c6ff'); // 確保背景顏色持續為紫色
  let x = (windowWidth - capture.width) / 2; // 計算影像的水平中心位置
  let y = (windowHeight - capture.height) / 2; // 計算影像的垂直中心位置
  image(capture, x, y); // 將影像繪製在畫布中央
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 動態調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 動態調整影像大小
}
