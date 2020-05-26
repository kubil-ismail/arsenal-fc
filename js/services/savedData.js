function getSavedMatch() {
  const rowMatch = document.getElementById('row-match')
  let card = ''

  getAll().then(data => {
    data.forEach((val) => {
      card += `
        <div class="col-lg-3 col-md-6 col-sm-6 my-4">
          <article>
            <div class="card shadow-sm ">
              <img src="./img/${Math.floor(Math.random() * 4) + 1}.JPG" class="card-img-top" alt="Match">
              <div class="card-body">
                <h5 class="card-title">${val.utcDate.substring(0, 10)}</h5>
                <p class="card-text">${val.competition.name}</p>
                <button class="btn btn-danger delete" data-id="${val.id}">Delete</button>
              </div>
            </div>
          </article>
        </div>
      `
    })
    rowMatch.innerHTML = card
  }).then(data => {
    $('.delete').on('click', (res) => {
      // Get Date
      let id = res.currentTarget.dataset.id
      deleteMatch(id)
    })
  })
}