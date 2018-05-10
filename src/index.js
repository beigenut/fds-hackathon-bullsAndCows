
class Game {

  constructor (strike = 0, ball = 0, out = 0, inning = 0, judgeCount = 0, setting = 0 ) {
    this.strike = strike;
    this.ball = ball;
    this.out = out;
    this.inning = inning;
    this.judgeCount = judgeCount;
    this.setting = setting;
  }

  numGenerator () {
    let a = Math.random()*6
    let b = a+3
    return ['0','1','2','3','4','5','6','7','8','9'].sort(function(a, b){return 0.5 - Math.random()}).slice(a,b)
  }


 ballCount (setting, input) {
  let count = 0;
  for (let i = 0; i < 3; i ++) {
    for (let j = 0; j <3;j++ ){
      if (i !== j) {
        if (setting[i] === input[j]) {
          count++
        }
      }
    }
  }
  return count;
}


 outCount (strike, ball) {
  let count = 0;
  ( strike === 0 && ball === 0 ) ? count++ : ""
  return count
}


strikeCount(settingNum, inputNum) {
  let strikeCnt = 0
  for(let i = 0; i < inputNum.length; i++){
    inputNum[i] === settingNum[i] ? strikeCnt++ : ''  
  }
  return strikeCnt
 }


 inputConvertor (num) {
  let list = num.toString().split("")
  console.log(list)
  if (list.length === 3 && (num+1)) {
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



judge (outCount, inning, strikeCount) {
  if(outCount === 3) {
    conclusion.textContent = "Fail, Three Out"
    // document.querySelector(".try").classList.add("unshow")   
    return 1
  }
  if(inning === 9 && strikeCount < 3) {
    conclusion.textContent = "Fail, Over Nine Inning"
    // document.querySelector(".try").classList.add("unshow")
    return 1
  }
  if(strikeCount > 2) {
    conclusion.textContent = q2.join("") + ", You Win"
    // document.querySelector(".try").classList.add("unshow")
    return 1
  }
}


result (strikeCount, ballCount, outCount) {
  if (strikeCount === 0 && ballCount === 0) {
    let recordBoard = document.querySelector(".recordBoard__result");
    recordBoard.appendChild(document.createElement("p"));
    recordBoard.lastChild.textContent =
    " Out: " + outCount.toString()
  } else {
    let recordBoard = document.querySelector(".recordBoard__result");
    recordBoard.appendChild(document.createElement("p"));
    recordBoard.lastChild.textContent =
    " Ball: " + ballCount.toString() 
    + " Strike: " + strikeCount.toString()
  }
}


recorder (input, inning) {
    let recordBoard = document.querySelector(".recordBoard__result");
    recordBoard.appendChild(document.createElement("p"));
    recordBoard.lastChild.textContent =
    " Inning: " + inning.toString() 
    " Input: " + input.toString()
}


}


let demand;


let startButton = document.querySelector(".lowerPart__gameStart")
let resetButton = document.querySelector(".lowerPart__gameReset")
let howButton = document.querySelector(".lowerPart__howToPlay")
let count = document.querySelector(".chanceCount")
let timeLeft = document.querySelector(".timeLeft")
let recoder =  document.querySelector(".recordBoard__recorder")
let result = document.querySelector(".recordBoard__result")
let conclusion = document.querySelector(".conclusion")
let inputBar = document.querySelector(".inputBar")




startButton.addEventListener("click", e => {
  demand = new Game()
  demand.setting = demand.numGenerator()
  console.log("click new game", demand)
  startButton.textContent = "Reset"}
)

inputBar.addEventListener('keypress', e => {
  let key = e.keyCode;
  if (key === 13 && !demand.judgeCount) {
    let input = inputBar.value
    if (demand.inputConvertor(input)) {
      demand.inning++
      input = demand.inputConvertor(input)
      demand.ball = demand.ballCount(demand.setting,input)
      demand.strike = demand.strikeCount(demand.setting,input)
      demand.out += demand.outCount(demand.strike,demand.ball)
      demand.recorder(input,demand.inning)
      demand.result(demand.strike, demand.ball, demand.out)
      console.log(demand)
      demand.judgeCount = demand.judge(demand.out, demand.inning, demand.strike)
      if(demand.judgeCount > 10) {
        startButton.textContent = "Start"
      }
      inputBar.value = ""
    } else { return ""}
  }
});



