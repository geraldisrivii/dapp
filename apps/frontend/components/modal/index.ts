import type { Modal } from "~/types/modals"


const modals: Modal[] = []
const METADATE_KEY = '$METADATA'

export function createModal(id: string) {
  const alreadyExists = modals.findIndex((x: Modal) => x.id === id) !== -1
  if (alreadyExists) {
    // console.warn(`warn:: modal with id "${id}" already exists!`)
    return
  }
  const modalStore = reactive({} as Record<string, unknown>)
  function getStoreProperty<T>(
    key: string,
    defaultValue?: T
  ): ComputedRef<T | undefined | unknown> {
    return computed(() => modalStore[key] ?? defaultValue)
  }
  function setStoreProperty(key: string, value: unknown) {
    modalStore[key] = value
  }
  function getModalMetadata() {
    return getStoreProperty(METADATE_KEY, {})
  }
  const state = shallowRef(false)
  const newModal = {
    inject: id,
    id,
    state,
    setState(_state: boolean, metadata?: unknown) {
      setStoreProperty(METADATE_KEY, metadata)
      state.value = _state
    },
    getStoreProperty,
    setStoreProperty,
    getModalMetadata
  } as Modal
  modals.push(newModal)
  return newModal
}

export function getModalById(id: string): Modal | null {
  const modal = modals.find((x: Modal) => x.id === id) ?? null
  if (modal) {
    return {
      ...modal,
      metadata: modal.getModalMetadata()
    } as Modal
  }
  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function initializeModals(modals: any) {
  for (const prop of Object.values(modals)) {
    if (typeof prop === 'object') {
      initializeModals(prop)
    } else {
      createModal(prop as string)
    }
  }
}

export function useModalHooks(modalName: string) {
  const modal = getModalById(modalName)
  if (!modal) {
    console.error('Cannot use modal hooks: modal is undefined - ', modalName)
    return {
      onModalMounted: () => {},
      onModalUnmounted: () => {},
      disposeHooks: () => {}
    }
  }
  const modalState = computed(() => modal.state.value)

  let unmountedDispose: (() => void) | null = null
  let mountedDispose: (() => void) | null = null

  const onModalMounted = (callback = () => {}) => {
    mountedDispose = watch(modalState, (val) => {
      if (val) {
        callback()
      }
    })
  }
  const onModalUnmounted = (callback = () => {}) => {
    unmountedDispose = watch(modalState, (val) => {
      if (!val) {
        callback()
      }
    })
  }

  const disposeHooks = () => {
    unmountedDispose?.()
    mountedDispose?.()
  }

  return {
    onModalMounted,
    onModalUnmounted,
    disposeHooks
  }
}
