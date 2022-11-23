const iterableToString = (iterable: Iterable<string>) => {
  let s = ''
  // @ts-ignore
  for (const i of iterable) {
    s += i
  }
  return s
}

export default iterableToString
