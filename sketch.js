let capture;
let graphics;
let cameraError = false; // 用於檢查攝影機是否啟用成功

function setup() {
  createCanvas(windowWidth, windowHeight); // 建立全螢幕畫布
  background('#e7c6ff'); // 設定背景顏色為紫色

  // 嘗試啟用攝影機
  try {
    capture = createCapture(VIDEO, function (stream) {
      if (!stream.active) {
        cameraError = true; // 如果攝影機無法啟用，設定錯誤標誌
      }
    });
    capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
    capture.hide(); // 隱藏原始影像，僅顯示繪製的影像
  } catch (e) {
    cameraError = true; // 捕捉例外錯誤
  }

  // 建立與視訊畫面相同大小的圖形
  graphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8);
}

function draw() {
  background('#e7c6ff'); // 確保背景顏色持續為紫色

  if (cameraError) {
    // 如果攝影機無法啟用，顯示錯誤訊息
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('無法連線到攝影機，請檢查權限或設備。', width / 2, height / 2);
    return;
  }

  let x = (windowWidth - capture.width) / 2; // 計算影像的水平中心位置
  let y = (windowHeight - capture.height) / 2; // 計算影像的垂直中心位置

  // 更新 graphics 的內容
  graphics.background(0); // 設定背景顏色為黑色
  for (let i = 0; i < graphics.width; i += 20) {
    for (let j = 0; j < graphics.height; j += 20) {
      let col = capture.get(i, j); // 取得 capture 對應位置的顏色
      graphics.fill(col);
      graphics.noStroke();
      graphics.ellipse(i, j, 15, 15); // 繪製寬高為 15 的圓
    }
  }

  // 繪製視訊畫面
  translate(width, 0); // 將畫布的原點移到右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, -x - capture.width, y); // 繪製翻轉後的影像

  // 繪製圖形在視訊畫面上方
  image(graphics, -x - capture.width, y - graphics.height - 10); // 在視訊畫面上方繪製圖形，間隔 10px
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 動態調整畫布大小
  if (!cameraError) {
    capture.size(windowWidth * 0.8, windowHeight * 0.8); // 動態調整影像大小
  }
  graphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8); // 重新建立與視訊畫面相同大小的圖形
}
