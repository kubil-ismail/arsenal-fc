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
              <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
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
              <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
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
  })
}