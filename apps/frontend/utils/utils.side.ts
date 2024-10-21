export function isClientSide() {
  return process.client || typeof window !== 'undefined'
}

export function isServerSide() {
  return process.server || typeof window === 'undefined'
}
