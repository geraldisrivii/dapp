export function createShortedTextNormal(text: string, pre = 8, post = 4) {
  if (!text) return null
  else if (pre + post >= text.length) return text
  return `${text.substring(0, pre)}...${text.substring(text.length - post)}`
}

export function emojiRemover(text: string) {
  return text.replaceAll(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ''
  )
}

export function commaSeparated(
  input: number | string | null | undefined
): string {
  const str: string =
    typeof input === 'number' || typeof input === 'string' ? String(input) : ''

  if (str) {
    return str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  } else {
    return ''
  }
}

// Web3 Number Formatter
export function w3nf(numb: string | number) {
  let normalizedNumb = numb as number
  if (typeof numb === 'string') {
    normalizedNumb = parseFloat(normalizedNumb as unknown as string)
  } else if (typeof numb !== 'number') {
    return -1
  }

  if (normalizedNumb === 0) {
    return normalizedNumb
  }

  const fixedNumber = normalizedNumb.toFixed(6)
  const [firstSymbol] = fixedNumber
  if (firstSymbol === '0') {
    return parseFloat(fixedNumber)
  }
  const [beforeFloat] = fixedNumber.split('.')
  return parseFloat(fixedNumber.slice(0, beforeFloat.length + 3))
}

export const formatUds = (value: number | string) => {
  return commaSeparated(parseFloat(value as string).toFixed(2))
}

export const handleFloatValue = (floatValue: number | string) => {
  let value = parseFloat(floatValue as string).toFixed(2)
  if (value.slice(-3) === '.00') {
    value = value.slice(0, -3)
  } else if (value.slice(-1) === '0') {
    value = value.slice(0, -1)
  }
  return value
}
