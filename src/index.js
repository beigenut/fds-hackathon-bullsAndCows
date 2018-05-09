

class Game {
  constructor({inputContainer, setting}) {
    this.inputContainer = [];
    this.setting = gen();
  } 
  

 gen () {
  return ['0','1','2','3','4','5','6','7','8','9'].sort(function(a, b){return 0.5 - Math.random()}).slice(0,3)
}


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


 output (num, setting, inputContainer) {v
  let input = inputConvertor(num)
  let ball = ballCount(setting, input)
  let strike = strikeCount(setting, input)
  let out = outCount(strike, ball)
  inputPush(input, inputContainer)
  return [strike, ball, out]
}

}

