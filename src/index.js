document.addEventListener('DOMContentLoaded', () => {

URL = 'http://localhost:3000/dogs'
fetch(URL)
.then(resp=> resp.json())
.then(dogs=> renderDogs(dogs))

//---> Render all dogs to dog table
const table = document.querySelector('#table-body')
function renderDogs(dogs) {
  dogs.forEach(dog=> {
    table.innerHTML += `
      <tr>
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button id="${dog.id}" class="edit-btn">Edit</button></td>
      </tr>
    `
  })
}


//---> Render all dogs to dog table
document.addEventListener('click', function(event) {
  if(event.target.className === 'edit-btn') {
    URL_DOG = `${URL}/${event.target.id}`
    fetch(URL_DOG)
    .then(resp=> resp.json())
    .then(dog=> renderEditForm(dog))
  }
})



//---> Puts selected dog into edit form and makes PATCH request
function renderEditForm(dog) {
  const editForm = document.querySelector('#dog-form')
  editForm.children[0].value = dog.name
  editForm.children[1].value = dog.breed
  editForm.children[2].value = dog.sex
  editForm.children[3].addEventListener('click', function(event) {
    event.preventDefault()
    let data = {
      name: editForm.children[0].value,
      breed: editForm.children[1].value,
      sex: editForm.children[2].value
    }
    fetch(URL_DOG, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(function() {
      fetch(URL)
      .then(resp=>resp.json())
      .then(dogs=>{
        table.innerHTML = ''
        renderDogs(dogs)
      })
    })
  })
}


}) // end of DOMContentLoaded
