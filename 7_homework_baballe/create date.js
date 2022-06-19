const event0 = new Date('August 19, 1975 23:15:30 UTC')
const jsonDate0 = event0.toJSON()
console.log(jsonDate0)
// expected output: "1975-08-19T23:15:30.000Z"
console.log(new Date(jsonDate).toUTCString())
// expected output: Tue, 19 Aug 1975 23:15:30 GMT
const event1 = new Date('May 30, 1982 23:15:30 UTC')
const jsonDate1 = event1.toJSON()
console.log(jsonDate1)
// expected output: "1982-05-30T23:15:30.000Z"
const event2 = new Date('March 11, 2023 23:15:30 UTC')
const jsonDate2 = event2.toJSON()
console.log(jsonDate2)
// expected output: "2023-03-11T23:15:30.000Z"
const event3 = new Date('Jun 03, 2023 20:10:30 UTC')
const jsonDate3 = event3.toJSON()
console.log(jsonDate3)
// expected output: "2023-06-03T20:10:30.000Z"