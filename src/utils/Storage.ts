enum StorageMode {
  LOCAL,
  SESSION
}
class MyStorage {
  private storage: Storage
  constructor(public storageMode: StorageMode) {
    this.storage = storageMode === StorageMode.LOCAL ? localStorage : sessionStorage
  }

  set(key: string, value: any) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    this.storage.setItem(key, value)
  }

  get(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      try {
        return JSON.parse(value)
      }
      // eslint-disable-next-line unused-imports/no-unused-vars
      catch (error: unknown) {
        return value
      }
    }
    return null
  }

  remove(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

export const session = new MyStorage(StorageMode.SESSION)
export const local = new MyStorage(StorageMode.LOCAL)
