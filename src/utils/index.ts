export const generateUID = (len = 8) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const walkTree = () => {
  // TODO
}

export const inputEvtNames = ['input', 'change', 'focus', 'blur']

export const safeEval = (str: string) => {
  console.log(str)
  // eslint-disable-next-line no-eval
  return eval?.(`'use strict';${str}`)
}

export const functionWrapper = (functionBody: string) => {
  // eslint-disable-next-line no-new-func
  return new Function(functionBody)()
}
