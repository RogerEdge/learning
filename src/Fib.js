function fibSeq(
  num,
  resultNum,
  howManyTimes,
  array
) {
  if ( resultNum > 1 ) {
    array.push(num)
  }
  
  const result = num + resultNum
  
  if ( howManyTimes > 0 ) {
    //console.log('howManyTimes', howManyTimes, num, '+', resultNum, '=',result)
    howManyTimes = howManyTimes - 1 // --howManyTimes
    return fibSeq(resultNum, result, howManyTimes, array)
  }

  return array
}

//const result = fibSeq(1, 1, 20, [])

//console.log('roger\'s result', result)

export function Fib() {
  const runFunction=()=> {
    var num1 = document.getElementById("numInput1").value;
    var num2 = document.getElementById("numInput2").value;
    var num3 = document.getElementById("numInput3").value;
    //console.log("here",typeof(num1),typeof(num2),typeof(num3),[]);
    var result = fibSeq(Number(num1), Number(num2), Number(num3),[]);
    alert(result);
  }
  return (
    <div>
    <form>
      <label htmlFor={"numInput1"}>Enter the first number:</label>
      <input type="number" id="numInput1" />
      <br /><br />
      <label htmlFor={"numInput2"}>Enter the second number:</label>
      <input type="number" id="numInput2" />
      <br /><br />
      <label htmlFor={"numInput3"}>Enter the third number:</label>
      <input type="number" id="numInput3" />
      <br /><br />
      <button type="button" onClick={runFunction}>Submit</button>
    </form>
    </div>
  )
}