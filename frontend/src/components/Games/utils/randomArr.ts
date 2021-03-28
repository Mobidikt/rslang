/* eslint-disable */
const randomArr = (inputArray: [], outputLength: number) => {
  function shuffle(a: any) {
    let j, x, i
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = a[i]
      a[i] = a[j]
      a[j] = x
    }
    return a
  }
  const result = inputArray.filter(
    (elem, index, array) => array.indexOf(elem) == index
  )
  return shuffle(result).slice(0, outputLength)
}  

export default randomArr