// MD
// 中国居民身份证校验码算法
// 1. 将身份证号码前面的17位数分别乘以不同的系数。从第一位到第十七位的系数分别为：7－9－10－5－8－4－2－1－6－3－7－9－10－5－8－4－2。
// 2. 将这17位数字和系数相乘的结果相加。
// 3. 用加出来和除以11，取余数。
// 4. 余数只可能有0－1－2－3－4－5－6－7－8－9－10这11个数字。其分别对应的最后一位身份证的号码为1－0－X－9－8－7－6－5－4－3－2。
// 5. 通过上面计算得知如果余数是3，第18位的校验码就是9。如果余数是2那么对应的校验码就是X，X实际是罗马数字10。
// 例如：某男性的身份证号码为【53010219200508011x】， 我们看看这个身份证是不是合法的身份证。首先我们得出前17位的乘积和【(5*7)+(3*9)+(0*10)+(1*5)+(0*8)+(2*4)+(1*2)+(9*1)+(2*6)+(0*3)+(0*7)+(5*9)+(0*10)+(8*5)+(0*8)+(1*4)+(1*2)】是189，然后用189除以11得出的结果是189/11=17----2，也就是说其余数是2。最后通过对应规则就可以知道余数2对应的检验码是X。所以，可以判定这是一个正确的身份证号码。

// 身份证17位系数
const indentityFactor: number[] = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]

// 余数映射
const remainderMapping: string[] = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]

// TODO: 输出身份证信息最后一位数字
function getLastNumber(indentity: string | Buffer): string {
  let count = 0

  if (typeof indentity === "object") indentity = indentity.toString()

  for (let index = 0; index < indentity.length - 1; index++) {
    // console.log(`${index}: count-->${count}`);
    count += ((parseInt(indentity[index]) * indentityFactor[index]))
  }

  return remainderMapping[(count % 11)]
}

// TODO: 身份证验证
function indentityCheck(indentity: string | Buffer): boolean {
  if (typeof indentity === "object") indentity = indentity.toString()
  return getLastNumber(indentity) === indentity[indentity.length - 1]
}

export { getLastNumber, indentityCheck, remainderMapping, indentityFactor }