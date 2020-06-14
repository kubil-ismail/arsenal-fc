const url = 'https://api.football-data.org/v2'

// Get Match Limit 4
const getMatch = new Promise((resolve, reject) => {
  fetch(`${url}/teams/57/matches?limit=4`, {
    headers: {
      'X-Auth-Token': 'b4546d523461485cb8555904e0009dda'
    }
  })
    .then(response => response.json())
    .then(data => resolve(data))
    .catch(err => reject(err))
})

// Set Match Limit 4
const setMatch = () => {
  const rowMatch = document.getElementById('match')
  let card = ''
    getMatch.then(data => {
      data.matches.forEach((val, key) => {
        card += `
        <div class="col s12 m4 l3">
          <div class="card">
            <div class="card-image">
              <img src="./img/${++key}.JPG">
              <a class="btn-floating halfway-fab waves-effect waves-light red saved" data-id="${val.utcDate.substring(0, 10)}"><i class="material-icons">add</i></a>
            </div>
            <div class="card-content">
              <p>${val.utcDate.substring(0, 10)}</p>
              <small>${val.competition.name}</small>
            </div>
          </div>
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

// Set All Match
const setAllMatch = () => {
  const rowMatch = document.getElementById('match')
  let card = ''

  getAllMatch.then(data => {
    data.matches.forEach((val, key) => {
      card += `
        <div class="col s12 m4 l3">
          <div class="card">
            <div class="card-image">
              <img src="./img/${Math.floor(Math.random() * 4) + 1}.JPG">
              <a class="btn-floating halfway-fab waves-effect waves-light red saved" data-id="${val.utcDate.substring(0, 10)}"><i class="material-icons">add</i></a>
            </div>
            <div class="card-content">
              <p>${val.utcDate.substring(0, 10)}</p>
              <small>${val.competition.name}</small>
            </div>
          </div>
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
        .then(() => console.log(data))
    })
  })
}