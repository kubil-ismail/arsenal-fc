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
  const rowStanding = document.getElementById('standing-row')
  let rows = ''

  getStanding.then(data => {
    data.standings[0].table.forEach((val, key) => {
      rows += `
        <tr>
          <th class="no">${++key}</th>
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