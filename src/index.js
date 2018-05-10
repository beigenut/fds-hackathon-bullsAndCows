
class Game {

  constructor (strike = 0, ball = 0, out = 0, inning = 0, judgeCount = 0, setting = 0, time = new Date().getTime(), input = [], timeCount = 0, inputTime = {} ) {
    this.strike = strike;
    this.ball = ball;
    this.out = out;
    this.inning = inning;
    this.judgeCount = judgeCount;
    this.setting = setting;
    this.time = time;
    this.input = input;
    this.timeCount = timeCount;
    this.inputTime = inputTime;
  }

  numGenerator () {
    let a = Math.random()*6
    let b = a+3
    return ['0','1','2','3','4','5','6','7','8','9'].sort(function(a, b){return 0.5 - Math.random()}).slice(a,b)
  }


 ballCount () {
  let count = 0;
  for (let i = 0; i < 3; i ++) {
    for (let j = 0; j <3;j++ ){
      if (i !== j) {
        if (this.setting[i] === this.input[j]) {
          count++
        }
      }
    }
  }
  return count;
}


 outCount () {
  let count = 0;
  ( this.strike === 0 && this.ball === 0 ) ? count++ : ""
  return count
}


strikeCount() {
  let strikeCnt = 0
  for(let i = 0; i < this.input.length; i++){
    this.input[i] === this.setting[i] ? strikeCnt++ : ''  
  }
  return strikeCnt
 }


 inputConvertor () {
  if (this.input.toString().length === 3 && parseInt(this.input)) {
    let list = this.input.toString().split("")
    console.log("in getin")
    let count = 0;
    list[0] === list[1] ? count++ : ''
    list[0] === list[2] ? count++ : ''
    list[2] === list[1] ? count++ : ''
    console.log("count", count)
    return count === 0 ? list : ( alert ("Please input again"))
  } else {
    alert ("Please input again")
  }
}



judge () {
  if(this.out === 3 || (this.inning === 9 && this.strike < 3)) {
    document.querySelector(".result__lose").classList.remove("offScreen")
    return 1
  }
  if(this.strike > 2) {
    document.querySelector(".result__win").classList.remove("offScreen")
    return 1
  }
}


result () {

  document.querySelector(".js__record").insertBefore(document.createElement("div"), document.querySelector(".js__record").childNodes[1])
  
  document.querySelector(".js__record").childNodes[1].classList.add("game-record__list")

  let target = document.querySelector(".game-record_list")
  
  target.appendChild(document.createElement("span"))
  target.lastChild.classList.add("game-record__turn")
  target.lastChild.textContent = inning.toString()

  target.appendChild(document.createElement("span"))
  target.lastChild.classList.add("game-record__digit")
  target.lastChild.classList.add("game-record__digit1")
  target.lastChild.textContent = input[0].toString()
  
  target.appendChild(document.createElement("span"))
  target.lastChild.classList.add("game-record__digit")
  target.lastChild.classList.add("game-record__digit2")
  target.lastChild.textContent = input[1].toString()

  target.appendChild(document.createElement("span"))
  target.lastChild.classList.add("game-record__digit")
  target.lastChild.classList.add("game-record__digit3")
  target.lastChild.textContent = input[2].toString()

  target.appendChild(document.createElement("span"))
  target.lastChild.classList.add("game-record__strike")

  target.appendChild(document.createElement("span"))
  target.lastChild.classList.add("game-record__ball")

  target.appendChild(document.createElement("span"))
  target.lastChild.classList.add("game-record__out")

  let strikeSpan = document.querySelector(".game-record__strike")
  let ballSpan = document.querySelector(".game-record__ball")
  let outSpan = document.querySelector(".game-record__out")

  if (this.strike === 0 && this.ball === 0) {

    outSpan.appendChild(document.createElement("span"))
    outSpan.lastChild.classList.add("span__color-blue")
    outSpan.lastChild.textContent = this.strike.toString()

    outSpan.appendChild(document.createElement("span"))
    outSpan.lastChild.textContent = "Out"

  } else {     
    strikeSpan.appendChild(document.createElement("span"))
    strikeSpan.lastChild.classList.add("span__color-blue")
    strikeSpan.lastChild.textContent = this.strike.toString()

    strikeSpan.appendChild(document.createElement("span"))
    strikeSpan.lastChild.textContent = "Strike(s)"

    ballSpan.appendChild(document.createElement("span"))
    ballSpan.lastChild.classList.add("span__color-blue")
    ballSpan.lastChild.textContent = this.ball.toString()

    ballSpan.appendChild(document.createElement("span"))
    ballSpan.lastChild.textContent = "ball(s)"

  }

}


recorder () {
    let recordBoard = document.querySelector(".recordBoard__result");
    recordBoard.appendChild(document.createElement("p"));
    recordBoard.lastChild.textContent =
    " Inning: " + this.inning.toString() 
    + " Input: " + this.input.join("").toString()
}


timerInterval (timer) {
  this.inputTime = new Date().getTime()
  let x = setInterval( e => {
    // console.log("interval!")
    let past = new Date().getTime()
    let left = 60000 - (past - this.inputTime)
    // console.log("left", left)
    let minutes = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((left % (1000 * 60)) / 1000);
    let temp = "";
    temp += ((minutes < 10) ? "0" : "") + minutes;
    temp += ((seconds < 10) ? ":0" : ":") + seconds;
    timer.textContent = temp
    if (minutes < 1 && seconds < 1) {
      clearInterval(x);
      this.judgeCount = 1;
      document.querySelector(".result__lose").classList.remove("offScreen")   
    } else if (this.judgeCount) {
      clearInterval(x);
    }
    }, 1000)
}

timerWhole (timer) {
  let x = setInterval( e => {
    // console.log("whole")
    let past = new Date().getTime()
    let left = past - this.time
    // console.log("left", left)
    let minutes = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((left % (1000 * 60)) / 1000);
    let temp = "";
    temp += ((minutes < 10) ? "0" : "") + minutes;
    temp += ((seconds < 10) ? ":0" : ":") + seconds;
    timer.textContent = temp
    if (this.judgeCount) {
      clearInterval(x);
    }
    }, 1000)
  
}

}


let demand;


let startButton = document.querySelector(".game-bnt__start")
let resetButton = document.querySelector(".game-bnt__reset")
// let howButton = document.querySelector(".lowerPart__howToPlay")
let count = document.querySelector(".chanceCount")
let timeLeft = document.querySelector(".js__game-left__time")
let timePast = document.querySelector(".js__game-win__time")
let conclusion = document.querySelector(".game-win")
let inputBar = document.querySelector(".game-form__input")

// let recoder =  document.querySelector(".recordBoard__recorder")
// let result = document.querySelector(".recordBoard__result")



startButton.addEventListener("click", e => {
  demand = new Game()
  demand.timerWhole(timePast)
  demand.setting = demand.numGenerator()
  console.log("click new game", demand)}
)

resetButton.addEventListener("click", e => {

  timeLeft.textContent = "01:00";
 

  document.querySelector(".result__lose").classList.remove("offScreen")
  document.querySelector(".result__win").classList.remove("offScreen")
  
  demand.judgeCount = 1;
  demand = new Game()
  demand.timerWhole(timePast)
  demand.setting = demand.numGenerator()
  console.log("click reset game", demand)}
)


inputBar.addEventListener('keypress', e => {
  let key = e.keyCode;
  if (key === 13 && !demand.judgeCount) {
    demand.input = inputBar.value
    console.log(demand)
    if (demand.inputConvertor()) {
      demand.timerInterval(timeLeft)
      demand.inning++
      demand.input = demand.inputConvertor()
      demand.ball = demand.ballCount()
      demand.strike = demand.strikeCount()
      demand.out += demand.outCount()
      // demand.recorder()
      demand.result()
      console.log(demand)
      demand.judgeCount = demand.judge()
      inputBar.value = ""
    } else { return ""}
  }
});



