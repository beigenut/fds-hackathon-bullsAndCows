
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
    if (count === 0 ) {
      return list 
    } else {
      inputBar.value = ""
      alert ("Please input again")
    }
  } else {
    inputBar.value = ""
    alert ("Please input again")
  }
}



judge () {
  if(this.out === 3 || (this.inning === 9 && this.strike < 3)) {
    answerNums.textContent = 
    this.setting[0] + " " +
    this.setting[1] + " " +
    this.setting[2]
    // startButton.classList.remove("btn__disable")
    // resetButton.classList.add("btn__disable")
    resultLose.classList.remove("offScreen")
    return 1
  }
  if(this.strike > 2) {
    usedChance.textContent = this.inning
    // startButton.classList.remove("btn__disable")
    // resetButton.classList.add("btn__disable")
    resultWin.classList.remove("offScreen")
    return 1
  }
}


result () {

  jsRecord.insertBefore(document.createElement("div"), jsRecord.children[1])
  
  jsRecord.children[1].classList.add("game-record__list")

  let target = document.querySelector(".game-record__list")
  console.log(target)
  
  target.appendChild(document.createElement("span"))
  target.lastChild.classList.add("game-record__turn")
  target.lastChild.textContent = this.inning.toString()

  target.appendChild(document.createElement("span"))
  target.lastChild.classList.add("game-record__digit")
  target.lastChild.classList.add("game-record__digit1")
  target.lastChild.textContent = this.input[0].toString()
  
  target.appendChild(document.createElement("span"))
  target.lastChild.classList.add("game-record__digit")
  target.lastChild.classList.add("game-record__digit2")
  target.lastChild.textContent = this.input[1].toString()

  target.appendChild(document.createElement("span"))
  target.lastChild.classList.add("game-record__digit")
  target.lastChild.classList.add("game-record__digit3")
  target.lastChild.textContent = this.input[2].toString()

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
    outSpan.lastChild.textContent = this.out.toString()

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


// recorder () {
//     let recordBoard = document.querySelector(".recordBoard__result");
//     recordBoard.appendChild(document.createElement("p"));
//     recordBoard.lastChild.textContent =
//     " Inning: " + this.inning.toString() 
//     + " Input: " + this.input.join("").toString()
// }


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
    if (minutes < 1 && seconds <30) {
      timeLeft.classList.remove("span__color-blue")
      timeLeft.classList.add("span__color-pink")
    }
    if (minutes < 1 && seconds < 1) {
      clearInterval(x);
      this.judgeCount = 1;
      resultLose.classList.remove("offScreen")   
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

// let jsFixed = document.querySelector(".js__row__fixed")

// let recoder =  document.querySelector(".recordBoard__recorder")
// let result = document.querySelector(".recordBoard__result")




let demand;

let startButton = document.querySelector(".game-bnt__start")
let resetButton = document.querySelector(".game-bnt__reset")
// let howButton = document.querySelector(".lowerPart__howToPlay")
let count = document.querySelector(".chanceCount")
let timeLeft = document.querySelector(".js__game-left__time")
let timePast = document.querySelector(".js__game-win__time")
let conclusion = document.querySelector(".game-win")
let inputBar = document.querySelector(".game-form__input")


let usedChance = document.querySelector(".js__game-win__chance")
let answerNums = document.querySelector(".game-lose__answer-nums")
let leftChance = document.querySelector(".js__game-left__chance")

let jsRow = document.querySelector(".js__row")
let jsRecord = document.querySelector(".js__record")

let resultWin = document.querySelector(".result__win") 
let resultLose = document.querySelector(".result__lose")



function startBtn () {
  startButton.classList.add("btn__disable")
  resetButton.classList.remove("btn__disable")
  resultWin.classList.add("offScreen")
  resultLose.classList.add("offScreen")
  inputBar.classList.remove("offScreen")

  demand = new Game()
  console.log(demand.setting)
  demand.timerWhole(timePast)
  demand.setting = demand.numGenerator()
  console.log("click new game", demand)
}


function resetBtn () {
  jsRow.classList.add("offScreen")
  jsRecord.classList.add("offScreen")
  resetButton.classList.add("btn__disable")
  startButton.classList.remove("btn__disable")
  resultWin.classList.add("offScreen")
  resultLose.classList.add("offScreen")
  inputBar.classList.add("offScreen")

  inputBar.value  = ""



  let childrenLen = jsRecord.children.length
  // console.log('childrenLen', childrenLen)
  // console.log("jsRecord.children",jsRecord.children)
  // console.log("jsRecord.children[childrenLen]",jsRecord.children[childrenLen])
  // console.log("jsRecord.children[childrenLen].tagName", jsRecord.children[childrenLen].tagName)
  // let i = 0;


  while (jsRecord.children[childrenLen-1].tagName !== "P") {
    // console.log(i, "remove children enter", "remove node", jsRecord.lastChild)
    jsRecord.removeChild(jsRecord.lastChild)
    childrenLen = jsRecord.children.length
    // i++
   }



    jsRecord.appendChild(document.createElement("div"))
    jsRecord.lastChild.classList.add("record__base")



  leftChance.classList.add("span__color-blue")
  leftChance.classList.remove("span__color-pink")

  timeLeft.textContent = "01:00";
  demand.judgeCount = 1;
  // demand = new Game()
  // demand.timerWhole(timePast)
  // demand.setting = demand.numGenerator()
  console.log("click reset game", demand)}



startButton.addEventListener("click", e => {
  resetButton = document.querySelector(".game-bnt__reset")
  startBtn()
  resetButton.addEventListener("click", function () {
    resetBtn()
  })
  startButton = "" }
)


resetButton.addEventListener("click", e => {
  startButton = document.querySelector(".game-bnt__start")
  resetBtn()
  startButton.addEventListener("click", function () {
    startBtn()
  })
  resetButton = ""
})



inputBar.addEventListener('keypress', e => {
  let key = e.keyCode;
  if (key === 13 && !demand.judgeCount) {
    demand.input = inputBar.value
    console.log(demand)
    if (demand.inputConvertor()) {
      
      jsRow.classList.remove("offScreen")
      jsRecord.classList.remove("offScreen")


      if(demand.inning > 4){
        console.log("inning coloring enter")
        leftChance.classList.remove("span__color-blue")
        leftChance.classList.add("span__color-pink")
      }
      
      timeLeft.classList.remove("span__color-pink")
      timeLeft.classList.add("span__color-blue")
      
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
      leftChance.textContent = 9 - demand.inning
      
    } 
  }
});






// startButton.addEventListener("click", e => {
//   startButton.classList.add("btn__disable")
//   resetButton.classList.remove("btn__disable")
//   resultWin.classList.add("offScreen")
//   resultLose.classList.add("offScreen")
//   inputBar.classList.remove("offScreen")

//   demand = new Game()
//   console.log(demand.setting)
//   demand.timerWhole(timePast)
//   demand.setting = demand.numGenerator()
//   console.log("click new game", demand)}
// )

// resetButton.addEventListener("click", e => {
//   jsRow.classList.add("offScreen")
//   jsRecord.classList.add("offScreen")
//   resetButton.classList.add("btn__disable")
//   startButton.classList.remove("btn__disable")
//   resultWin.classList.add("offScreen")
//   resultLose.classList.add("offScreen")
//   inputBar.classList.add("offScreen")

//   inputBar.value  = ""

//   let children = jsRecord.children.length
//   console.log('children', children)
//   if ( children > 2) {
//     console.log("remove children enter")
//     for ( let i = 0; i < children; i++) {
//       console.log("remove node", i)
//       jsRecord.removeChild(jsRecord.lastChild)
//     }
//     jsRecord.appendChild(document.createElement("div"))
//     jsRecord.lastChild.classList.add("record__base")
//   }

//   leftChance.classList.add("span__color-blue")
//   leftChance.classList.remove("span__color-pink")

//   timeLeft.textContent = "01:00";
//   demand.judgeCount = 1;
//   // demand = new Game()
//   // demand.timerWhole(timePast)
//   // demand.setting = demand.numGenerator()
//   console.log("click reset game", demand)}
// )




// console.log("offset", jsFixed.offsetTop, jsFixed.offsetLeft)
// let originOffset = jsFixed.offsetTop
// window.addEventListener("scroll", e => { 
//   if (window.scrollY > originOffset) {
  //     jsFixed.style.position = "fixed"
  //     jsFixed.style.top = "10px"
  //   }
  //   if (window.scrollY <= originOffset) {
    //     jsFixed.style.position = ""
    //     jsFixed.style.top = ""
    //   }
    // })
    
