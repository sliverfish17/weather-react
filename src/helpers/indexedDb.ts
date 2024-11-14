import { CACHE_EXPIRATION } from 'src/constants/cache';
import { IWeatherData } from 'src/types/Weather';

const DB_NAME = 'WeatherApp';
const STORE_NAME = 'WeatherCache';
const MAX_ENTRIES = 2;

export const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      } else {
        const store = request.transaction?.objectStore(STORE_NAME);
        if (store && !store.indexNames.contains('timestamp')) {
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const addToCache = async (data: IWeatherData) => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise<void>((resolve, reject) => {
    const dataWithTimestamp = { ...data, timestamp: Date.now() };

    const addRequest = store.put(dataWithTimestamp);

    addRequest.onsuccess = async () => {
      await enforceMaxEntries();
    };
    addRequest.onerror = () => {
      reject(addRequest.error);
    };

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject(transaction.error);
    };
  });
};

export const getEntryByCity = async (key: string): Promise<IWeatherData | null> => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.openCursor();
    request.onsuccess = (event: Event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        const entry = cursor.value as IWeatherData & { timestamp: number };
        if (entry.name === key) {
          const isExpired = Date.now() - entry.timestamp > CACHE_EXPIRATION;
          if (isExpired) {
            cursor.delete();
            resolve(null);
          } else {
            resolve(entry);
          }
        } else {
          cursor.continue();
        }
      } else {
        resolve(null);
      }
    };
    request.onerror = () => reject(request.error);
  });
};

const enforceMaxEntries = async () => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const countRequest = store.count();

  countRequest.onsuccess = () => {
    if (countRequest.result > MAX_ENTRIES) {
      const index = store.index('timestamp');
      const cursorRequest = index.openCursor();

      cursorRequest.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursor>).result;
        if (cursor) {
          cursor.delete();
        }
      };
      cursorRequest.onerror = () => {
        console.error('Failed to delete the oldest entry from cache.');
      };
    }
  };

  countRequest.onerror = () => {
    console.error('Failed to count entries in the cache.');
  };
};

export const getCachedData = async (): Promise<IWeatherData[]> => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
