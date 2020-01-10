exports.formatMoney = (num) => {
  let flag=false
  if (num < 0) {
    num = -num
    flag=true
  }
  var result = '';
  num = Number(num.toString() || 0).toFixed(2);
  var numAry = num.toString().split(".");
  var preNum = numAry[0];
  var lastNum = numAry[1];

  while (preNum.length > 3) {
    result = ',' + preNum.slice(-3) + result;
    preNum = preNum.slice(0, preNum.length - 3);
  }
  if (preNum) {
    result = preNum + result;
  }

  result=result+"."+lastNum;

  if(flag) {
    result = "-"+result
  }
  return result;
};
