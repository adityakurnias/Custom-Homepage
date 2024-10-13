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
    keyPath: "name",
  });
  objectStore.createIndex("name", "name", { unique: false });
};

// Create data
export function createData(name, domain) {
  let transaction = db.transaction([storeName], "readwrite");
  let objectStore = transaction.objectStore(storeName);

  let data = {
    name: name,
    domain: domain,
  };

  let request = objectStore.add(data);

  request.onsuccess = () => {
    getData();
    console.log("Shortcut has been added to your storage");
  };

  request.onerror = () => {
    console.error("Unable to add shortcut.");
  };
}

export function getData() {
  let transaction = db.transaction([storeName], "readonly");
  let objectStore = transaction.objectStore(storeName);
  let request = objectStore.getAll();

  request.onsuccess = () => {
    let data = request.result;
    let res = data
      .map((item) => {
        return `
        <a class="shortcut" href="${item.domain}">
            <img src="https://www.google.com/s2/favicons?domain=${item.domain}&sz=48">
            <span>${item.name}</span>
        </a>`;
      })
      .join("");
    document.getElementById("shortcuts").innerHTML = res;
  };
}
