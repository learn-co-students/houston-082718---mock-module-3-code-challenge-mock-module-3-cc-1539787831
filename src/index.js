document.addEventListener("DOMContentLoaded", () => {
  fetchDogs();
});
// On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.

function fetchDogs() {
  document.getElementById("table-body").innerHTML = "";
  fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(data => {
      data.forEach(dog => {   
        renderDogs(dog);
      });
    });
}

function renderDogs(dog) {
  document.getElementById("table-body").innerHTML += `
  <tr id="row-${dog.id}">
    <td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button data-id=${dog.id} id="edit" onclick="editDog(${dog.id})">Edit</button></td>
  </tr>
  `;
}

//Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
function editDog(id) {
  fetch(`http://localhost:3000/dogs/${id}`)
    .then(resp => resp.json())
    .then(dog => {
      updateDogForm(dog);
    });
}

function updateDogForm(dog) {
  let formContainer = document.getElementById("dog-form");
  formContainer.innerHTML = `
  <form id='dog-form' class="padding margin border-round border-grey">
    <input type="name" name="name" placeholder="name" value="${dog.name}">
    <input type="breed" name="breed" placeholder="breed" value="${dog.breed}">
    <input type="sex" name="sex" placeholder="sex" value="${dog.sex}">
    <input type="hidden" name="id" value="${dog.id}">
    <input type="submit" value="Submit">
  </form>
  `;
  formContainer.addEventListener("submit", event => {
    patchDog(event);
  });
}

//On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).

function patchDog(event) {
  event.preventDefault();
  let dogId = event.target.id.value;
  let dogName = event.target.name.value;
  let dogBreed = event.target.breed.value;
  let dogSex = event.target.sex.value;

  let data = {
    id: dogId,
    name: dogName,
    breed: dogBreed,
    sex: dogSex
  };
  fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(data)
  }).then(data => data.json())
  .then(dog => rederADog(dog));
}

function rederADog(dog) {
  document.getElementById(`row-${dog.id}`).innerHTML =
  `<tr id="row-${dog.id}">
    <td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button id="edit" onclick="editDog(${dog.id})">Edit</button></td>
  </tr>`;
}
