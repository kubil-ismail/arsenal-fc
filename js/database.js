const dbPromised = idb.open("arsenal-fc-v1", 1, function (upgradeDb) {
  const matchObjectStore = upgradeDb.createObjectStore("match_list", {
    keyPath: "id"
  });
  matchObjectStore.createIndex("id", "id", { unique: true });
});

const saveMatch = (match) => {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("match_list", "readwrite");
      const store = tx.objectStore("match_list");
      store.add(match);
      return tx.complete;
    })
    .then(function () {
      M.toast({ html: 'Data saved' })
      console.log("match berhasil di simpan.");
    });
}

const getAll = () => {
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

const deleteMatch = (id) => {
  const dataId = parseInt(id)
  return new Promise(function (resolve, reject) {
    dbPromised.then(function (db) {
      var tx = db.transaction('match_list', 'readwrite')
      var store = tx.objectStore('match_list')
      store.delete(dataId)
      return tx.complete
    }).then(function (data) {
      location.reload();
    });
  })
}