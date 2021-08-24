import { DatabaseIndexes, MyRecord } from '../models';

export class Database {
  public db: IDBDatabase = null;

  init(dbName: string, version?: number): void {
    const IDB = window.indexedDB;
    const openRequest = IDB.open(dbName, version); // создаем базу данных
    openRequest.onupgradeneeded = (): void => {
      const database = (openRequest as IDBOpenDBRequest).result; // заходим в базу данных
      if (!database.objectStoreNames.contains('gamePlayers')) {
        // если хранилище "books" не существует
        const objectStore = database.createObjectStore('gamePlayers', {
          keyPath: 'id',
          autoIncrement: true,
        });
        objectStore.createIndex(DatabaseIndexes.Name, DatabaseIndexes.Name, {
          unique: false,
        });
        objectStore.createIndex(DatabaseIndexes.Email, DatabaseIndexes.Email, {
          unique: false,
        });
        objectStore.createIndex(DatabaseIndexes.Score, DatabaseIndexes.Score, {
          unique: false,
        });
        objectStore.createIndex(DatabaseIndexes.Avatar, DatabaseIndexes.Avatar, {
          unique: false,
        });
        this.db = database;
      }
    };

    openRequest.onsuccess = () => {
      this.db = openRequest.result;
    };
  }

  write(name: string, email: string, score: number, avatar: string | ArrayBuffer): void {
    const transaction: IDBTransaction = this.db.transaction('gamePlayers', 'readwrite');
    transaction.oncomplete = () => {};
    const objectStore: IDBObjectStore = transaction.objectStore('gamePlayers');
    const newRecord: MyRecord = {
      name,
      email,
      score,
      avatar,
    };
    objectStore.put(newRecord);
  }

  readAll(): void {
    const transaction = this.db.transaction('gamePlayers', 'readonly');
    const objectStore: IDBObjectStore = transaction.objectStore('gamePlayers');
    objectStore.getAll();
  }

  readFiltered(): Array<MyRecord> {
    const transaction = this.db.transaction('gamePlayers', 'readonly');
    const objectStore: IDBObjectStore = transaction.objectStore('gamePlayers');
    const result = objectStore.index('score').openCursor(null, 'prev');
    const resData: Array<MyRecord> = [];
    result.onsuccess = () => {
      const cursor = result.result;
      if (cursor) {
        resData.push(cursor.value);
        cursor.continue();
      }
    };

    return resData;
  }
}
