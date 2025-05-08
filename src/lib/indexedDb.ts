import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'health-data-db';
const STORE_NAME = 'records';

export async function getDB(): Promise<IDBPDatabase | null> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    console.warn('IndexedDB not available');
    return null;
  }

  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}
export async function getRecords() {
  const db = await getDB();
  if (!db) return [];
  return await db.getAll(STORE_NAME);
}

export async function saveRecord(record: unknown) {
  const db = await getDB();
  if (!db) return;
  await db.add(STORE_NAME, record);
}
