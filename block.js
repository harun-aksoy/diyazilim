/*
import { View, Color, Gesture } from "mukk"

const cols = 9
const rows = 9
const cellSize = window.innerWidth/10 //40

// 🎯 Oyun tahtası
const board = View()
  .frame(cols * cellSize, rows * cellSize)
  .position(window.innerWidth/2, window.innerHeight/2)
  .radius(13)

let grid = Array.from(0)
// ızgara kutuları
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    let cell = View().components(Gesture)
      .frame(cellSize, cellSize)
      .position(x * cellSize+cellSize/2, y * cellSize+cellSize/2) 
      .border("white", 1)
      .background(Color('pink'))
      .parent(board)
      .radius(9)
    
    grid.push(cell)
  }
}

// 🎲 Tetromino tipleri
const shapes = [
  [[1,1,1]],       
  [[1,1,1],[1,1,1]],     
  [[1,1,1],[0,1,0]], 
  [[1,1,0],[0,1,1]], 
  [[0,1,1],[1,1,0]], 
  [[1,1,1],[1,0,0]], 
  [[1,1,1],[0,0,1]]  
]

function randomShape() {
  return shapes[Math.floor(Math.random() * shapes.length)]
}
function randomColor() {
  const colors = ["red","blue","green","yellow","purple","cyan","orange"]
  return colors[Math.floor(Math.random() * colors.length)]
}


// 🎯 Alt kısımda seçimler
function spawnChoices() {
  document.querySelectorAll(".choice").forEach(c => c.remove())

  const baseY = window.innerHeight - window.innerHeight/8
  const baseX = window.innerWidth/2

  for (let i=0; i<3; i++) {
    const matrix = randomShape()
    const color = randomColor()
    const shape = View().components(Gesture)
    

    // blokları oluştur
    for (let y=0; y<matrix.length; y++) {
      for (let x=0; x<matrix[0].length; x++) {
        if(matrix[y][x]) {
          shape.child(
          View() 
            .frame(cellSize, cellSize)
            .position(x * cellSize+cellSize/2, y * cellSize+cellSize/2)
            .background(Color(color))
            .border('white')
            .radius(9)
          )//.border()

          shape.frame(cellSize*3,cellSize*2)
          shape.position((baseX) + (i-1)*(baseX*0.6), baseY)
          shape.style.transform += 'scale(0.98)'
        }
      }
    }

    // seçim konumu
    shape._ox = shape.position()[0] // orijinal X
    shape._oy = shape.position()[1] // orijinal Y
    //shape.classList.add("choice")

    // 🖐️ sürükle bırak
    shape.on("press", (self, check) => {
      shape._pointerDown = true;
      if (check) {
        shape._pointerDown = false;
      }
    })
    // 🖐️ sürükle bırak
    document.body.components(Gesture)
    document.body.on("drag", (self, end, dx, dy, px, py) => {
      if (!end) {
        if (shape._pointerDown) {
          shape.position(px, py)
        }
      } else {
        // şimdilik sadece eski yerine dönsün
        shape.position(shape._ox, shape._oy)
      }
    })

    
  }
}

spawnChoices()
*/





/*
import { View, Color, Gesture } from "mukk"

const cols = 9
const rows = 9
const cellSize = window.innerWidth / 10

// 🎯 Tahta
const board = View()
  .frame(cols * cellSize, rows * cellSize)
  .position(window.innerWidth/2, window.innerHeight/2)
  .background(Color("hotpink"))
  .radius(16)
  .child(
    View()
      .frame(5,rows * cellSize)
      .position(cols * cellSize/3, rows * cellSize/2)
      .background(Color("black")),
    View()
      .frame(5,rows * cellSize)
      .position(cols * cellSize/1.5, rows * cellSize/2)
      .background(Color("black")),
    View()
      .frame(cols * cellSize,5)
      .position(rows * cellSize/2, cols * cellSize/3)
      .background(Color("black")),
    View()
      .frame(cols * cellSize,5)
      .position(rows * cellSize/2, cols * cellSize/1.5)
      .background(Color("black")),
  )

// 🎯 Grid hücreleri
const grid = []
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const cell = View()
      .frame(cellSize, cellSize)
      .position(x * cellSize + cellSize/2, y * cellSize + cellSize/2)
      .border("white", 1)//.radius(9)
      //.background(Color("hotpink"))
      .parent(board)
    cell._fill = false
    cell._gx = x
    cell._gy = y
    //cell.style.transform += 'scale(0.9)'
    grid.push(cell)
  }
}

// 🎲 Şekiller
const shapes = [
  [[1,1,1]],
  [[1,1],[1,1]],
  [[1]], // tekli
  // [[1],[1,1]],  dikey ikili
  [[1,1,1],[0,1,0]],
  [[1,1,0],[0,1,1]],
  [[0,1,1],[1,1,0]],
  [[1,1,1],[1,0,0]],
  [[1,1,1],[0,0,1]]
]

function randomShape() {
  return shapes[Math.floor(Math.random() * shapes.length)]
}
function randomColor() {
  const colors = ["red","blue","green","yellow","purple","cyan","orange"]
  return colors[Math.floor(Math.random() * colors.length)]
}

// 🎯 Seçimler
function spawnChoices() {
  document.querySelectorAll(".choice").forEach(c => c.remove())

  const baseY = window.innerHeight - window.innerHeight/8
  const baseX = window.innerWidth/2

  for (let i = 0; i < 3; i++) {
    const matrix = randomShape()
    const color = randomColor()
    const shape = View().components(Gesture)

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[0].length; x++) {
        if (matrix[y][x]) {
          shape.child(
            View()
              .frame(cellSize, cellSize)
              .position(x * cellSize + cellSize/2, y * cellSize + cellSize/2)
              .background(Color(color))
              .border("white", 1)
              .radius(9)
          )
          shape.frame(matrix[0].length * cellSize-1, matrix.length * cellSize)
          shape.position(baseX + (i-1)*(baseX*0.6), baseY)
          shape.style.transform += 'scale(0.96)'
        }
      }
    }

    shape._ox = shape.position()[0]
    shape._oy = shape.position()[1]
    shape._matrix = matrix
    shape._color = color

    shape.on("press", (self, check) => {
      shape._pointerDown = !check
    })

    document.body.components(Gesture)
    document.body.on("drag", (self, end, dx, dy, px, py) => {
      if (!end) {
        if (shape._pointerDown) shape.position(px, py)
      } else {
        const [bx, by] = board.position()
        const [bw, bh] = board.frame()

        let sx = shape.position()[0] - shape.frame()[0]/2 + cellSize/2 + 16
        let sy = shape.position()[1] - shape.frame()[1]/2 + cellSize/2 + 16

        const gx = Math.round((sx - (bx - bw/2)) / cellSize) - 1
        const gy = Math.round((sy - (by - bh/2)) / cellSize) - 1

        // 🧩 Grid içine oturabiliyorsa hizala
        if (gx >= 0 && gy >= 0 && gx + shape._matrix[0].length <= cols && gy + shape._matrix.length <= rows) {
          const snappedX = (gx * cellSize) + bx - bw/2 + (shape._matrix[0].length * cellSize)/2
          const snappedY = (gy * cellSize) + by - bh/2 + (shape._matrix.length * cellSize)/2
          shape.position(snappedX, snappedY)

          // 🎯 Grid doluluk işaretle
          for (let yy = 0; yy < shape._matrix.length; yy++) {
            for (let xx = 0; xx < shape._matrix[0].length; xx++) {
              if (shape._matrix[yy][xx]) {
                const idx = (gy + yy) * cols + (gx + xx)
                const cell = grid[idx]
                if (cell && !cell._fill) {
                  cell._fill = true
                  cell.background(Color(shape._color))
                }
              }
            }
          }

          // 🎯 Şekli yok et
          shape.destroy()

        } else {
          // dışarıdaysa eski yerine dön
          shape.position(shape._ox, shape._oy)
        }
      }
    })
  }
}

spawnChoices()
*/




import { View, Color, Animation, Text, Gesture } from "mukk"

let sesPop = './sounds/pop-ui.wav'
let sesUp = './sounds/up-ui.wav'
let sesPoint = './sounds/point2.ogg'

let sesTak = './sounds/ui-lock.wav'
let sesTuk = './sounds/ui-hover.wav'

const audioPoint = new Audio(sesPoint);
audioPoint.preload = 'auto';
const audioOver = new Audio('./sounds/die1.ogg');
audioOver.preload = 'auto';

const audioPop = new Audio(sesPop);
audioPop.preload = 'auto';
const audioUp = new Audio(sesUp);
audioUp.preload = 'auto';

const audioTak = new Audio(sesTak);
audioTak.preload = 'auto';
const audioTuk = new Audio(sesTuk);
audioTuk.preload = 'auto';

const cols = 9
const rows = 9
const cellSize = window.innerWidth / 10
let point = 0 // 🎯 puan

// 🎯 Tahta
const board = View()
  .frame(cols * cellSize, rows * cellSize)
  .position(window.innerWidth / 2, window.innerHeight / 2)
  .background(Color("hotpink"))
  .radius(16).border('white',2)
  .child(
    View().frame(2, rows * cellSize).position(cols * cellSize / 3, rows * cellSize / 2).background(Color("white")),
    View().frame(2, rows * cellSize).position(cols * cellSize / 1.5, rows * cellSize / 2).background(Color("white")),
    View().frame(cols * cellSize, 2).position(rows * cellSize / 2, cols * cellSize / 3).background(Color("white")),
    View().frame(cols * cellSize, 2).position(rows * cellSize / 2, cols * cellSize / 1.5).background(Color("white"))
  )

// 🎯 Grid hücreleri
const grid = []
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const cell = View()
      .frame(cellSize, cellSize)
      .position(x * cellSize + cellSize / 2-1, y * cellSize + cellSize / 2-1)
      .border("white", 0.7)
      //.parent(board)
      board.background(cell)
    cell._fill = false
    cell._gx = x
    cell._gy = y
    grid.push(cell)
  }
}

// 🎲 Şekiller
const shapes = [
  [[1,1,1]],
  [[1,1],[1,1]],
  [[1]],[[1]],[[1]],
  [[1],[1],[1]],
  [[1,1,1],[0,1,0]],
  [[1,1,0],[0,1,1]],
  [[0,1,1],[1,1,0]],
  [[1,1,1],[1,0,0]],
  [[1,1,1],[0,0,1]]
]

function randomShape() {
  return shapes[Math.floor(Math.random() * shapes.length)]
}
function randomColor() {
  const colors = ["red","blue","green","yellow","purple","cyan","orange"]
  return colors[Math.floor(Math.random() * colors.length)]
}

// 🔍 Satır & sütun doluluk kontrolü
function checkLines() {
  let cleared = 0

  // Satırlar
  for (let y = 0; y < rows; y++) {
    const fullRow = grid.slice(y * cols, y * cols + cols).every(c => c._fill)
    if (fullRow) {
      for (let x = 0; x < cols; x++) {
        const cell = grid[y * cols + x]
        cell._fill = false
        cell.background(Color("hotpink"))
      }
      cleared++
    }
  }

  // Sütunlar
  for (let x = 0; x < cols; x++) {
    const fullCol = grid.filter(c => c._gx === x).every(c => c._fill)
    if (fullCol) {
      for (let y = 0; y < rows; y++) {
        const cell = grid[y * cols + x]
        cell._fill = false
        cell.background(Color("hotpink"))
      }
      cleared++
    }
  }

  if (cleared > 0) {
    point += cleared *10
    pointView.innerText = point
    pointView.ease('out',0.5,true,{},(self,p)=>{self.style.fontSize = p*36 +'px'})
    //audioPoint.currentTime = 0
    audioPoint.play()
    console.log("puan:", point)
  }
}

// 🧱 aktif alt şekillerin tutulduğu liste
let activeShapes = []

// 🎯 Seçimler oluştur
function spawnChoices() {
  activeShapes.forEach(s => s.destroy())
  activeShapes = []

  const baseY = window.innerHeight - window.innerHeight / 8
  const baseX = window.innerWidth / 2

  for (let i = 0; i < 3; i++) {
    const shape = createShape(baseX + (i - 1) * (baseX * 0.6), baseY)
    activeShapes.push(shape)
  }
}

// 🎯 Tek bir şekil oluşturucu
function createShape(posX, posY) {
  const matrix = randomShape()
  const color = randomColor()
  const shape = View().components(Gesture)

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x]) {
        shape.child(
          View()
            .frame(cellSize, cellSize)
            .position(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2)
            .background(Color(color))
            .border("white", 1)
            .radius(11)
        )
      }
    }
  }

  shape.frame(matrix[0].length * cellSize - 1, matrix.length * cellSize)
  shape.position(posX, posY)
  shape.style.transform += "scale(0.96)"
  shape._ox = posX
  shape._oy = posY
  shape._matrix = matrix
  shape._color = color
  shape._pointerDown = false

  
  shape.on("press", (self, check) => {
    shape._pointerDown = !check
  })

  shape.on('tap',(self)=>{
    audioTuk.currentTime = 0;
    audioTuk.play()
  })

  document.body.components(Gesture)
  document.body.on("drag", (self, end, dx, dy, px, py) => {
    if (!end) {
      if (shape._pointerDown) shape.position(px, py)
    } else {
      const [bx, by] = board.position()
      const [bw, bh] = board.frame()

      const sx = shape.position()[0] - shape.frame()[0] / 2 + cellSize / 2 + 16
      const sy = shape.position()[1] - shape.frame()[1] / 2 + cellSize / 2 + 16

      const gx = Math.round((sx - (bx - bw / 2)) / cellSize) - 1
      const gy = Math.round((sy - (by - bh / 2)) / cellSize) - 1

      if (gx >= 0 && gy >= 0 && gx + shape._matrix[0].length <= cols && gy + shape._matrix.length <= rows) {
        let overlap = false
        for (let yy = 0; yy < shape._matrix.length; yy++) {
          for (let xx = 0; xx < shape._matrix[0].length; xx++) {
            if (shape._matrix[yy][xx]) {
              const idx = (gy + yy) * cols + (gx + xx)
              if (grid[idx]._fill) overlap = true
            }
          }
        }
      
        if (checkGameOver()) showGameOver()

        if (!overlap) {
          const snappedX = gx * cellSize + bx - bw / 2 + (shape._matrix[0].length * cellSize) / 2
          const snappedY = gy * cellSize + by - bh / 2 + (shape._matrix.length * cellSize) / 2
          shape.position(snappedX, snappedY)

          for (let yy = 0; yy < shape._matrix.length; yy++) {
            for (let xx = 0; xx < shape._matrix[0].length; xx++) {
              if (shape._matrix[yy][xx]) {
                const idx = (gy + yy) * cols + (gx + xx)
                const cell = grid[idx]
                cell._fill = true
                cell.background(Color(shape._color))
                audioTak.currentTime = 0;
                audioTak.play()
              }
            }
          }

          shape.destroy()
          activeShapes = activeShapes.filter(s => s !== shape)
          checkLines()

          // ✅ 3’ü de bitti mi? yenilerini oluştur
          if (activeShapes.length === 0) {
            spawnChoices()
            if (checkGameOver()) showGameOver()
          }

        } else {
          shape.position(shape._ox, shape._oy)
        }
      } else {
        shape.position(shape._ox, shape._oy)
      }
    }
  })
  return shape
}

// 🔍 Oynanabilir hamle kaldı mı kontrolü
function checkGameOver() {
  for (const shape of activeShapes) {
    for (let gy = 0; gy <= rows - shape._matrix.length; gy++) {
      for (let gx = 0; gx <= cols - shape._matrix[0].length; gx++) {
        let canPlace = true
        for (let yy = 0; yy < shape._matrix.length; yy++) {
          for (let xx = 0; xx < shape._matrix[0].length; xx++) {
            if (shape._matrix[yy][xx]) {
              const idx = (gy + yy) * cols + (gx + xx)
              if (grid[idx]._fill) canPlace = false
            }
          }
        }
        if (canPlace) return false // hâlâ bir yere konabiliyor
      }
    }
  }
  return true // hiç konamıyor, bitti
}


spawnChoices()



const pointView = View().components(Animation).parent(board)
.on('resize',self=>{
  self.frame(self.full,50)
  self.position(self.center,self.top)
  self.offset(0,-80)
})

pointView.innerText = point
pointView.style.fontSize = '36px'
pointView.style.color = 'hotpink'
pointView.style.textAlign = 'center'
pointView.style.userSelect = "none"

//document.body.child(Color('rgba(59, 59, 58, 1)'))


// Game Over View
function showGameOver() {
  View()
    .frame(window.innerWidth, window.innerHeight)
    .background(Color("linear-gradient(orchid,orange)")) // yarı saydam kırmızı
    .position(window.innerWidth/2, window.innerHeight/2)
    .radius(0)

  View().components(Gesture)
    .frame(150,70)
    .position(window.innerWidth/2,window.innerHeight/2+100)
    .radius(24)
    .background(Color("#6bc1ffff"))
    .shadow("rgba(0,0,0,0.5)",10,0,3)
    .on('tap',(self,check)=>{
        if(!check) {
            audioUp.currentTime = 0;
            audioUp.play()
            self.shadow("rgba(0,0,0,0.5)",4,0,1)
        }
        if(check) {
            audioPop.currentTime = 0;
            audioPop.play()
            self.shadow("rgba(0,0,0,0.5)",10,0,3)
            //window.location.reload();
            //location.href = location.href;
            history.go(0)
        }
    })
    .child(View().frame(0,0).on('resize',self=>self.position(self.center,self.center).offset(-13,-20)).child(
      Text('▶︎').size(32)
    ))

  const overView = View()
  .on('resize',self=>{
    self.frame(self.full,50)
    self.position(self.center,self.center)
    self.offset(0,-70)
  })

  overView.innerText = 'GameOver\n Score: '+ point
  overView.style.fontSize = '42px'
  overView.style.color = 'white'
  overView.style.textAlign = 'center'

  audioOver.currentTime = 0
  audioOver.play()
}
//showGameOver()

