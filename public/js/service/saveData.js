const getSavedMatch = () => {
  const rowMatch = document.getElementById('match')
  let card = ''

  getAll().then(data => {
    if(data.length > 0) {
      data.forEach((val) => {
        card += `
          <div class="col s12 m4 l3">
            <div class="card">
              <div class="card-image">
                <img src="./img/${Math.floor(Math.random() * 4) + 1}.JPG">
                <a class="btn-floating halfway-fab waves-effect waves-light red delete" data-id="${val.id}"><i class="material-icons">delete_forever</i></a>
              </div>
              <div class="card-content">
                <p>${val.utcDate.substring(0, 10)}</p>
                <small>${val.competition.name}</small>
              </div>
            </div>
          </div>
        `
      })
    } else {
      card += `
        <div class="materialert error">
            <div class="material-icons">error_outline</div>
            Data not found
        </div>
      `
    }
    rowMatch.innerHTML = card
  }).then(data => {
    $('.delete').on('click', (res) => {
      // Get Date
      let id = res.currentTarget.dataset.id
      deleteMatch(id)
    })
  })
}