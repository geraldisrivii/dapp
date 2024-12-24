export function usePending() {
  const pending = shallowRef(false);

  async function withPending<T>(fn: () => Promise<T>) {
    pending.value = true;
    return fn().finally(() => {
      pending.value = false;
    });
  }

  return {
    pending,
    withPending
  };
}
