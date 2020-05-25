$(document).ready(() => {
  $.ajax({
    url: 'https://api.football-data.org/v2/competitions/2021/standings',
    type: 'GET',
    headers: {
      "X-Auth-Token": "b4546d523461485cb8555904e0009dda"
    },
    success: (res) => {
      res.standings[0].table.map((val, key) => {
        $('#standings').append(`
            <tr>
            <td>${++key}</td>
            <td>${val.team.name}</td>
            <td>${val.won}</td>
            <td>${val.draw}</td>
            <td>${val.lost}</td>
            <td>${val.points}</td>
          </tr>
        `);
      });
    },
    error: () => {
      $('#standings').append(`
        <div class="col s12 m12">
          <h5>Ooppss... Data request data failed </h5>
        </div>
      `)
    }
  })
})
