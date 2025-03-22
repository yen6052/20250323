let seaweeds = [];
let pg;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('overlay'); // 將畫布放在 overlay div 中
  pg = createGraphics(windowWidth, windowHeight);
  pg.clear(); // 設置透明背景

  for (let j = 0; j < 40; j++) {
    seaweeds.push({
      x: (j + 1) * (width / 40), // 均勻分布的x位置
      height: random(160, 320), // 線條高度隨機在160到320之間
      width: random(30, 60), // 線條寬度隨機在30到60之間
      color: color(random(100, 255), random(100, 255), random(100, 255), 150), // 隨機顏色，飽和度不要太高，透明度設為150
      sway: random(150, 300), // 搖擺幅度隨機在150到300之間
      frequency: random(0.001, 0.005) // 搖擺頻率隨機在0.001到0.005之間
    });
  }
}

function draw() {
  pg.clear();
  pg.noFill();
  pg.blendMode(BLEND); // 設定混合模式為BLEND
  
  for (let seaweed of seaweeds) {
    pg.strokeWeight(seaweed.width); // 使用預先生成的寬度
    pg.stroke(seaweed.color); // 使用預先生成的顏色
    
    let y = height; // 底部固定點
    let segmentLength = seaweed.height; // 使用預先生成的高度
    
    pg.beginShape();
    pg.curveVertex(seaweed.x, y); // 底部固定點
    for (let i = 0; i <= 30; i++) { // 增加節點數量
      let factor = i / 30; // 計算節點位置的比例
      let offsetX = noise(frameCount * seaweed.frequency + i * 0.1) * seaweed.sway * factor - seaweed.sway / 2 * factor; // 使用噪聲函數生成不規律的搖擺幅度，越靠近底部搖擺幅度越小
      pg.curveVertex(seaweed.x + offsetX, y - i * (segmentLength / 30)); // 每個節點的位置
    }
    pg.endShape();
  }

  image(pg, 0, 0, windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pg.resizeCanvas(windowWidth, windowHeight);
}