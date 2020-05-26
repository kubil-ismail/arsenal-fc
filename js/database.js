const dbPromised = idb.open("arsenal-fc", 1, function (upgradeDb) {
  const matchObjectStore = upgradeDb.createObjectStore("match_list", {
    keyPath: "id"
  });
  matchObjectStore.createIndex("id", "id", { unique: true });
});

function saveMatch(match) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("match_list", "readwrite");
      const store = tx.objectStore("match_list");
      store.add(match);
      return tx.complete;
    })
    .then(function () {
      console.log("match berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised.then(function (db) {
      var tx = db.transaction("match_list", "readonly");
      var store = tx.objectStore("match_list");
      return store.getAll();
    }).then(function (match) {
      console.log(match)
      resolve(match);
    });
  });
}

function deleteMatch(id) {
  const dataId = parseInt(id)
  return new Promise(function (resolve, reject) {
    dbPromised.then(function (db) {
      var tx = db.transaction('match_list', 'readwrite')
      var store = tx.objectStore('match_list')
      store.delete(dataId)
      return tx.complete
    }).then(function (data) {
      console.log('Item deleted')
    });
  })
}