document.addEventListener('DOMContentLoaded', () => {
  document.getElementById(`edit-submit-button`).addEventListener("click", event => editDog(event))
  getAllDogs()
})

let currentlyEditingDog = null
let lastEditedDog = null

function getAllDogs() {
  const url = "http://localhost:3000/dogs"
  fetch(url)
  .then(response => response.json())
  .then(dogs => displayDogs(dogs))
}

function getDataForDog(id) {
  const url = `http://localhost:3000/dogs/${id}`
  return fetch(url)
  .then(response => response.json())
}

function updateDogData(dogData) {
  const url = `http://localhost:3000/dogs/${dogData.id}`
  fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(dogData),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(responseData => {
    removeHighlightFromPreviousEdit()
    lastEditedDog = dogData.id
    updateTableDataForDog(responseData)
  })
}

function removeHighlightFromPreviousEdit() {
  if (lastEditedDog != null) {
    const tableRow = document.getElementById(`dog-${lastEditedDog}-row`)
    tableRow.classList.remove("just-updated")
  }
}

function updateTableDataForDog(dog) {
  const tableRow = document.getElementById(`dog-${dog.id}-row`)
  tableRow.innerHTML = `<td>${dog.name}</td>
                        <td>${dog.breed}</td>
                        <td>${dog.sex}</td>
                        <td><button data-dog-id="${dog.id}" class="edit-button">Edit</button></td>`
  tableRow.classList.add("just-updated")
}

function displayDogs(dogs) {
  const table = document.getElementById("table-body")
  table.innerHTML = ""
  dogs.forEach((dog) => {
    table.innerHTML += `<tr id="dog-${dog.id}-row">
                          <td>${dog.name}</td>
                          <td>${dog.breed}</td>
                          <td>${dog.sex}</td>
                          <td><button data-dog-id="${dog.id}" class="edit-button">Edit</button></td>
                        </tr>`
  })

  table.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-button")) {
      const clickedDogId = parseInt(event.target.dataset.dogId)
      beginEditingDog(clickedDogId)
    }
  })
}

function beginEditingDog(dogID) {
  getDataForDog(dogID)
  .then((dogData) => {
    prefillEditForm(dogData)
    currentlyEditingDog = dogData.id
  })
}

function prefillEditForm(dogData)
{
  const editForm = document.getElementById("dog-form")
  const attributes = ["name", "breed", "sex"]
  attributes.forEach(attribute => {
    editForm.querySelector(`#edit-${attribute}-field`).value = dogData[attribute]
  })
}

function emptyEditForm() {
  const editForm = document.getElementById("dog-form")
  const attributes = ["name", "breed", "sex"]
  attributes.forEach(attribute => {
    editForm.querySelector(`#edit-${attribute}-field`).value = ""
  })
}

function editDog(event) {
  event.preventDefault()
  if (currentlyEditingDog != null) {
    const editForm = document.getElementById("dog-form")
    const data = {id: currentlyEditingDog}
    const attributes = ["name", "breed", "sex"]
    attributes.forEach(attribute => {
      data[attribute] = editForm.querySelector(`#edit-${attribute}-field`).value
    })
    updateDogData(data)
    currentlyEditingDog = null
    emptyEditForm()
  }
}