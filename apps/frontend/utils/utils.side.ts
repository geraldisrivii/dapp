export function isClientSide() {
  return import.meta.client || typeof window !== 'undefined'
}

export function isServerSide() {
  return import.meta.server || typeof window === 'undefined'
}
