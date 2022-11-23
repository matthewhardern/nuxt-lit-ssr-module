const isCustomElementTag = (name: string) => {
  return /-/.test(name)
}

export default isCustomElementTag
