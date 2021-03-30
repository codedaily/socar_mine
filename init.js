const mine_cnt = 10
const m = 10
const n = 10

let board = []

/**
 * 보드 생성
 */
function createBoard() {
  for(let i = 0; i < n; i++) {
    board.push([])
    for(let j = 0; j < m; j++) {
      board[i].push(0)
    }
  }
}

/**
 * 랜덤으로 지뢰 생성
 */
function randomMine() {
  for(let i = 0; i < mine_cnt; i++) {
    let rx = Math.floor(Math.random() * m)
    let ry = Math.floor(Math.random() * n)

    if(board[rx][ry] === 'm') {
      i--
    } else {
      board[rx][ry] = 'm'
    }
  }
}

/**
 * 보드 프린트
 */
function printBoard() {
  for(let i = 0; i < n; i++) {
    let row_mine = ''
    
    for(let j = 0; j < board[i].length; j++) {
      if(j == 0)  row_mine += board[i][j]
      else        row_mine += ', ' + board[i][j]
    }

    console.debug(row_mine)
  }
}

/**
 * 주변 지뢰값 카운팅
 */
function countMine() {
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < board[i].length; j++) {
      if(board[i][j] === 'm') {
        countUp(i, j)
      }
    }
  }
}

/**
 * x,y 좌표값에 따라 실행 가부 결정
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function isProcessing(x, y) {
  if(x < 0 || x > m-1 || y < 0 || y > n-1) return false
  return true
}

/**
 * 지뢰가 있는 좌표 주변으로 숫자 카운팅
 * @param {*} i 
 * @param {*} j 
 */
function countUp(i, j) {
  const arr = [-1, 0, 1], arr1 = [-1, 0, 1]
  let k = 0

  arr.forEach(val => {
    arr.forEach(val2 => {
      let x = i + val
      let y = j + val2

      if(isProcessing(x, y) && !(i == x && j == y)) {
        let num = board[x][y]
        if(num !== 'm') {
          board[x][y] = Number(num) + 1
        }
      }
    })
  })
}

createBoard()
randomMine()
countMine()
printBoard()