// Type-safe local storage service

export function saveToStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
}

export function getFromStorage<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error('Error getting from localStorage', error);
    return null;
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage', error);
  }
}

// For IndexedDB support if needed
export async function saveToIndexedDB(storeName: string, key: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ChokoMeDB', 1);
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      
      store.put(value, key);
      
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
      
      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };
    };
    
    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function getFromIndexedDB(storeName: string, key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ChokoMeDB', 1);
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const getRequest = store.get(key);
      
      getRequest.onsuccess = () => {
        db.close();
        resolve(getRequest.result);
      };
      
      getRequest.onerror = () => {
        db.close();
        reject(getRequest.error);
      };
    };
    
    request.onerror = () => {
      reject(request.error);
    };
  });
}