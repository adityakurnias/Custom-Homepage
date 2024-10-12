let db;
let dbName = "Shortcuts";
let storeName = "Shortcuts";

// Open or create the database
let request = indexedDB.open(dbName, 1);

request.onerror = function (event) {
  console.error("Database error:", event.target.error);
};

request.onsuccess = function (event) {
  db = event.target.result;
  console.log("Database opened successfully");
};

request.onupgradeneeded = function (event) {
  db = event.target.result;
  let objectStore = db.createObjectStore(storeName, {
    keyPath: "id",
    autoIncrement: true,
  });
  objectStore.createIndex("name", "name", { unique: false });
  console.log("Object store created");
};

// Create data
export function createData() {
  let transaction = db.transaction([storeName], "readwrite");
  let objectStore = transaction.objectStore(storeName);
  let data = { name: "google", domain: "google.com" };

  let request = objectStore.add(data);
  request.onsuccess = function () {
    console.log("Data has been added to your database.");
  };

  request.onerror = function () {
    console.error("Unable to add data.");
  };
}
