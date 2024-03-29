type LocalStorageKey = 'accountId' | 'pageNum'

export const getLocalStorageItem = (key: LocalStorageKey) =>
  localStorage.getItem(key)

export const setLocalStorage = (key: LocalStorageKey, value: string) =>
  localStorage.setItem(key, value)
