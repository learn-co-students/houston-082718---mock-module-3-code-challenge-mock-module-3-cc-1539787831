document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(response => {
      const dogs = response;
      const dogTable = document.querySelector("#table-body");
      renderDogs(dogs, dogTable);
    });

  document.querySelector("#dog-form").addEventListener("submit", () => {
    let dogForm = document.querySelector("#dog-form");
    let dogId = parseInt(dogForm.lastElementChild.dataset.id);
    let newName = dogForm.children[0].value;
    let newBreed = dogForm.children[1].value;
    let newSex = dogForm.children[2].value;
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: newName,
        breed: newBreed,
        sex: newSex
      })
    });
    fetch("http://localhost:3000/dogs")
      .then(response => response.json())
      .then(response => {
        const dogs = response;
        const dogTable = document.querySelector("#table-body");
        renderNewDogs(dogs, dogTable);
      });
  });
});

function renderNewDogs(dogs, table) {
  dogs.forEach(dog => {
    table.innerHTML = `<tr><td>${dog.name}</td> 
          <td>${dog.breed}</td> 
          <td>${dog.sex}</td> 
          <td><button id = "button" data-id = "${
            dog.id
          }">Edit</button></td></tr>`;
  });
}

function renderDogs(dogs, table) {
  dogs.forEach(dog => {
    table.innerHTML += `<tr><td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button id = "button" data-id = "${
          dog.id
        }">Edit</button></td></tr>`;
  });
}

document.addEventListener("click", function(event) {
  if (event.target.id === "button") {
    let id = parseInt(event.target.dataset.id);
    findAndLoadDog(id);
  }
});

function findAndLoadDog(id) {
  fetch(`http://localhost:3000/dogs`)
    .then(response => response.json())
    .then(response => {
      let found = response.find(function(dog) {
        return dog.id === id;
      });
      loadDog(found);
    });
}

function loadDog(dog) {
  let form = document.querySelector("#dog-form");
  for (let i = 0; i < form.childElementCount; i++) {
    if (form.children[i].name === "name")
      form.children[i].value = `${dog.name}`;
    else if (form.children[i].name === "breed")
      form.children[i].value = `${dog.breed}`;
    else if (form.children[i].name === "sex")
      form.children[i].value = `${dog.sex}`;
    else form.children[i].dataset.id = `${dog.id}`;
  }
}
