const url = 'https://api.football-data.org/v2'

// Get Standing List
const getStanding = new Promise((resolve, reject) => {
  fetch(`${url}/competitions/2021/standings`, {
    headers: {
      'X-Auth-Token': 'b4546d523461485cb8555904e0009dda'
    }
  })
  .then(response => response.json())
  .then(data => resolve(data))
  .catch(err => reject(err))
})

// Set STanding
const setStanding = () => {
  const rowStanding = document.getElementById('row-standing')
  let rows = ''

  getStanding.then(data => {
    data.standings[0].table.forEach((val, key) => {
      rows += `
        <tr>
          <th scope="row">${++key}</th>
          <td>${val.team.name}</td>
          <td>${val.won}</td>
          <td>${val.draw}</td>
          <td>${val.lost}</td>
          <td>${val.points}</td>
        </tr>
      `
    })
    rowStanding.innerHTML = rows
  })
}

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
const setMatch = () => {
  const rowMatch = document.getElementById('row-match')
  let card = ''

  getMatch.then(data => {
    data.matches.forEach((val, key) => {
      card += `
        <div class="col-lg-3 col-md-6 col-sm-6 my-4">
          <article>
            <div class="card shadow-sm ">
              <img src="./img/${++key}.JPG" class="card-img-top" alt="Match">
              <div class="card-body">
                <h5 class="card-title">${val.utcDate.substring(0,10)}</h5>
                <p class="card-text">${val.competition.name}</p>
                <button class="btn btn-danger saved" data-id="${val.utcDate.substring(0, 10)}">save</button>
              </div>
            </div>
          </article>
        </div>
      `
    })
    rowMatch.innerHTML = card
  }).then(() => {
    $('.saved').on('click',(res) => {
      // Get Date
      let date = res.currentTarget.dataset.id
      let detail = getDetailMatch(date)
      detail.then(data => saveMatch(data.matches[0]))
      .then(data => console.log('berhasil ditambah'))
    })
  })
}
