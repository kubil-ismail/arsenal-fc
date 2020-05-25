$(document).ready(() => {
  $.ajax({
    url: 'https://api.football-data.org/v2/teams/57/matches?limit=4',
    type: 'GET',
    headers: {
      "X-Auth-Token": "b4546d523461485cb8555904e0009dda"
    },
    success: (res) => {
      res.matches.map((val, key) => {
        $('#root').append(`
          <div class="col s6 m3">
            <div class="card">
              <div class="card-image">
                <a href="#">
                  <img class="match-cover" src="./src/img/${++key}.jpg">
                </a>
                <span class="card-title">${val.competition.name}</span>
                <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
              </div>
              <div class="card-content">
                <p class="truncate"><b>${val.utcDate}</b></p>
                <p>${val.group}</p>
              </div>
            </div>
          </div>
        `);
      });
    },
    error: (err) => {
      $('#root').append(`
        <div class="col s12 m12">
          <h5>Ooppss... Data request data failed </h5>
        </div>
      `)
    }
  })
})
