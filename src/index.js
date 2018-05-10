
class Game {

  numGenerator () {
    let a = Math.random()*6
    let b = a+3
    return ['0','1','2','3','4','5','6','7','8','9'].sort(function(a, b){return 0.5 - Math.random()}).slice(a,b)
  }


 ballCount (setting, input) {
  let count = 0;
  for (let i = 0; i < 3; i ++) {
    for (let j = 0; j <3;j++ ){
       i === j ? "" : (setting[i] === input[j] ? count++ : "" ) 
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
    return 0
  }
  if(inning === 9 && strikeCount < 3) {
    conclusion.textContent = "Fail, Over Nine Inning"
    // document.querySelector(".try").classList.add("unshow")
    return 1
  }
  if(strikeCount > 2) {
    conclusion.textContent = q2.join("") + ", You Win"
    // document.querySelector(".try").classList.add("unshow")
    return 2
  }
}


result (strikeCount, ballCount, outCount) {
  if (strikeCount === 0 && ballCount === 0) {
    let recordBoard = document.querySelector(".recordBoard__result");
    recordBoard.appendChild(document.createElement("p"));
    recordBoard.lastChild.textContent =
    + " Out: " + outCount.toString()
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



promptor (setting, inning) {
  let input = window.prompt("Input 3 digits number")
  if (this.inputConvertor(input)){
    inning++
    let strike = this.strikeCount (setting, input)
    let ball = this.ballCount(setting, input)
    let out = this.outCount(strike, ball)
    this.recorder (input, inning)
    this.result (strike, ball, out)
    switch (this.judge (out, inning, strike)) {
      case 0: return ""
      case 1: return ""
      case 2: return ""
      default: this.promptor(setting, inning)
    } 
      } else { this.promptor(setting, inning) }
}
}




let setting;
let inputContainer = [];
let demand ;
let input;
let inning = 0;



let startButton = document.querySelector(".lowerPart__gameStart")
let resetButton = document.querySelector(".lowerPart__gameReset")
let howButton = document.querySelector(".lowerPart__howToPlay")
let count = document.querySelector(".chanceCount")
let timeLeft = document.querySelector(".timeLeft")
let recoder =  document.querySelector(".recordBoard__recorder")
let result = document.querySelector(".recordBoard__result")
let conclusion = document.querySelector(".conclusion")





startButton.addEventListener("click", e => {
  demand = new Game
  setting = demand.numGenerator()
  demand.promptor(setting, inning)
  } 
)

