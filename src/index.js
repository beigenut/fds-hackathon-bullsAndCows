


 let setting =   numGenerator () {
  let a = Math.random()*6
  let b = a+3
  return ['0','1','2','3','4','5','6','7','8','9'].sort(function(a, b){return 0.5 - Math.random()}).slice(a,b)
}






class Game {



 ballCount (setting, input) {
  let count = 0;
  setting.forEach((elm,i) => {
    input.forEach((elm2, i2) => {
      i === i2 ?  "" : (elm === elm2 ? count++ : "")
      })
  })
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
  if (list.length === 3 && typeof num === "number") {
    let count = 0;
    list[0] === list[1] ? count++ : ''
    list[0] === list[2] ? count++ : ''
    list[2] === list[1] ? count++ : ''
    return count === 0 ? list : ( alert ("Please input again"))
  } else {
    alert ("Please input again")
  }
}


judge (outCount, inning, strikeCount) {
  if(outCount === 3) {
    resultText.textContent = "Fail, Three Out"
    document.querySelector(".try").classList.add("unshow")   
    return ""
  }
  if(inning === 9 && strikeCount < 3) {
    resultText.textContent = "Fail, Over Nine Inning"
    document.querySelector(".try").classList.add("unshow")
    return ""
  }
  if(strikeCount > 2) {
    resultText.textContent = q2.join("") + ", You Win"
    document.querySelector(".try").classList.add("unshow")
    return ""
  }
}


recorder (input, inning, strikeCount, ballCount, outCount) {
  let recordBoard = document.querySelector(".record");
  recordBoard.appendChild(document.createElement("p"));
  recordBoard.lastChild.textContent =
  "Input: " + input.value.toString()
  + " / Inning: " + inning.toString() 
  + " / Ball: " + strikeCount.toString() 
  + " / Strike: " + ballCount.toString() 
  + " / Out: " + outCount.toString()
}



 output (num, setting, inputContainer) {
  let input = inputConvertor(num)
  let ball = ballCount(setting, input)
  let strike = strikeCount(setting, input)
  let out = outCount(strike, ball)
  inputPush(input, inputContainer)
  return [strike, ball, out]
}

}
