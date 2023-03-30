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
    console.log('howManyTimes', howManyTimes, num, '+', resultNum, '=',result)
    howManyTimes = howManyTimes - 1 // --howManyTimes
    return fibSeq(resultNum, result, howManyTimes, array)
  }

  return array
}

const result = fibSeq(1, 1, 20, [])

console.log('roger\'s result', result)