/**
 * UGAMFRESH Buyer Module - IndexedDB Persistent Storage & Document Cache
 * Database: UgamFreshBuyerDB
 * Object Stores: 
 *   - offlineOrders: Persists locked escrow purchases and digital contracts
 *   - documentCache: Caches PDF/HTML POs, Mandi inspection reports, and invoices
 *   - searchHistory: Stores recent Spotlight searches & filter preferences
 */

(function () {
  'use strict';

  const DB_NAME = 'UgamFreshBuyerDB';
  const DB_VERSION = 1;
  let dbInstance = null;

  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (dbInstance) {
        resolve(dbInstance);
        return;
      }

      if (!window.indexedDB) {
        console.warn('IndexedDB not supported by browser. Falling back to in-memory/localStorage.');
        resolve(null);
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = function (event) {
        const db = event.target.result;

        // 1. Orders Store
        if (!db.objectStoreNames.contains('offlineOrders')) {
          const ordersStore = db.createObjectStore('offlineOrders', { keyPath: 'id' });
          ordersStore.createIndex('timestamp', 'timestamp', { unique: false });
          ordersStore.createIndex('crop', 'crop', { unique: false });
        }

        // 2. Documents & PO Cache Store
        if (!db.objectStoreNames.contains('documentCache')) {
          const docStore = db.createObjectStore('documentCache', { keyPath: 'docId' });
          docStore.createIndex('type', 'type', { unique: false });
          docStore.createIndex('created', 'created', { unique: false });
        }

        // 3. Search History & Preferences Store
        if (!db.objectStoreNames.contains('searchHistory')) {
          const searchStore = db.createObjectStore('searchHistory', { keyPath: 'id', autoIncrement: true });
          searchStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };

      request.onsuccess = function (event) {
        dbInstance = event.target.result;
        resolve(dbInstance);
      };

      request.onerror = function (event) {
        console.error('IndexedDB open error:', event.target.error);
        resolve(null);
      };
    });
  }

  // Generic store helper
  async function getStore(storeName, mode = 'readonly') {
    const db = await openDatabase();
    if (!db) return null;
    const tx = db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  const UgamBuyerDB = {
    // --- ORDERS STORE ---
    async saveOrder(order) {
      if (!order || !order.id) order = { ...order, id: 'ORD-' + Date.now() };
      order.timestamp = order.timestamp || new Date().toISOString();
      try {
        const store = await getStore('offlineOrders', 'readwrite');
        if (!store) return false;
        return new Promise((resolve) => {
          const req = store.put(order);
          req.onsuccess = () => resolve(true);
          req.onerror = () => resolve(false);
        });
      } catch (e) {
        console.warn('IDB saveOrder error:', e);
        return false;
      }
    },

    async getOrders() {
      try {
        const store = await getStore('offlineOrders', 'readonly');
        if (!store) return [];
        return new Promise((resolve) => {
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        });
      } catch (e) {
        console.warn('IDB getOrders error:', e);
        return [];
      }
    },

    // --- DOCUMENT CACHE ---
    async cacheDocument(docId, docType, title, content, metadata = {}) {
      const record = {
        docId: docId || 'DOC-' + Date.now(),
        type: docType || 'po',
        title: title || 'Digital Purchase Order',
        content: content,
        metadata: metadata,
        created: new Date().toISOString()
      };
      try {
        const store = await getStore('documentCache', 'readwrite');
        if (!store) return false;
        return new Promise((resolve) => {
          const req = store.put(record);
          req.onsuccess = () => resolve(true);
          req.onerror = () => resolve(false);
        });
      } catch (e) {
        console.warn('IDB cacheDocument error:', e);
        return false;
      }
    },

    async getDocument(docId) {
      try {
        const store = await getStore('documentCache', 'readonly');
        if (!store) return null;
        return new Promise((resolve) => {
          const req = store.get(docId);
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        });
      } catch (e) {
        console.warn('IDB getDocument error:', e);
        return null;
      }
    },

    // --- SEARCH HISTORY ---
    async saveSearchHistory(query) {
      if (!query || typeof query !== 'string' || !query.trim()) return;
      const record = {
        query: query.trim(),
        timestamp: new Date().toISOString()
      };
      try {
        const store = await getStore('searchHistory', 'readwrite');
        if (!store) return;
        store.add(record);
      } catch (e) {
        console.warn('IDB saveSearchHistory error:', e);
      }
    },

    async getSearchHistory(limit = 6) {
      try {
        const store = await getStore('searchHistory', 'readonly');
        if (!store) return [];
        return new Promise((resolve) => {
          const req = store.getAll();
          req.onsuccess = () => {
            const list = req.result || [];
            list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            // Unique by query
            const unique = [];
            const seen = new Set();
            for (const item of list) {
              if (!seen.has(item.query.toLowerCase())) {
                seen.add(item.query.toLowerCase());
                unique.push(item);
                if (unique.length >= limit) break;
              }
            }
            resolve(unique);
          };
          req.onerror = () => resolve([]);
        });
      } catch (e) {
        return [];
      }
    }
  };

  // Expose to global window
  window.UgamBuyerDB = UgamBuyerDB;

  // Initialize DB on boot
  openDatabase().then((db) => {
    if (db) console.log('✓ IndexedDB UgamFreshBuyerDB ready.');
  });
})();
