export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function createShortedTextNormal(text: string, pre = 8, post = 4) {
  if (!text) return null
  else if (pre + post >= text.length) return text
  return `${text.substring(0, pre)}...${text.substring(text.length - post)}`
}

export function returnLocaleFormat(locale: string | undefined) {
  switch (locale) {
    case 'vn':
      return 'vi-VN'
    case 'kr':
      return 'ko-KR'
    case 'jp':
      return 'ja-JP'
    case 'kz':
      return 'kk-KZ'
    default:
      return locale
  }
}

export function formatDate(
  date: string | number,
  options: Intl.DateTimeFormatOptions,
  lang?: string
) {
  const d = new Date(typeof date === 'number' ? date : Date.parse(date))
  const locale = returnLocaleFormat(lang ?? 'en')

  const formatter = Intl.DateTimeFormat(`${locale}`, options)
  return formatter.format(d)
}

export function emojiRemover(text: string) {
  return text.replaceAll(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ''
  )
}
