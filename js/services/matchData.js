const url = 'https://api.football-data.org/v2'

// Get All Match
const getAllMatch = new Promise((resolve, reject) => {
  fetch(`${url}/teams/57/matches`, {
    headers: {
      'X-Auth-Token': 'b4546d523461485cb8555904e0009dda'
    }
  })
    .then(response => response.json())
    .then(data => resolve(data))
    .catch(err => reject(err))
})

// Get Detail Match
const getDetailMatch = (date) => {
  return new Promise((resolve, reject) => {
    fetch(`${url}/teams/57/matches?dateFrom=${date}&dateTo=${date}`, {
      headers: {
        'X-Auth-Token': 'b4546d523461485cb8555904e0009dda'
      }
    })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

// Set Match
const setAllMatch = () => {
  const rowMatch = document.getElementById('row-match')
  let card = ''

  getAllMatch.then(data => {
    data.matches.forEach((val, key) => {
      card += `
        <div class="col-lg-3 col-md-6 col-sm-6 my-4">
          <article>
            <div class="card shadow-sm ">
              <img src="./img/${Math.floor(Math.random() * 4) + 1}.JPG" class="card-img-top" alt="Match">
              <div class="card-body">
                <h5 class="card-title">${val.utcDate.substring(0, 10)}</h5>
                <p class="card-text">${val.competition.name}</p>
                <button class="btn btn-danger saved" data-id="${val.utcDate.substring(0, 10)}">Save</button>
              </div>
            </div>
          </article>
        </div>
      `
    })
    rowMatch.innerHTML = card
  }).then(() => {
    $('.saved').on('click', (res) => {
      // Get Date
      let date = res.currentTarget.dataset.id
      let detail = getDetailMatch(date)
      detail.then(data => saveMatch(data.matches[0]))
        .then(data => console.log(data))
    })
  })
}