document.addEventListener("DOMContentLoaded", () => {
  //   table = document.getElementById("table-div");
  // let tblBody = createElement("tbody");
  //   let tbody = document.querySelector("tbody");
  //   let row = document.createElement("tr");
  //   let td = document.createElement("td");
  //   let tdText = document.createTextNode("some text");
  //   data.forEach(function(dog) {
  //     td.appendChild(tdText);
  //     row.appendChild(td);
  //     tbody.appendChild(row);

  fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(function(dog) {
      console.log(dog.name);
    });
});

// let nameData = document.getElementById("name-data");
// nameData.innerHTML += `<td>${dog.name}</td>`;

// let breedData = document.getElementById("breed-data");
// breedData.innerHTML += `<td>${dog.breed}</td>`;

// let sexData = document.getElementById("sex-data");
// sexData.innerHTML += `<td>${dog.sex}</td>`;

// table.innerHTML += `<table>
// <tr><th>Name</th><th>Breed</th><th>Sex</th><th>Edit Dog</th></tr>
// <tr><td>${dog.name}</td><td>${dog.breed}</td><td>${
//   dog.sex
// }</td><td><button>Edit Dog</button></td></tr></table>`;
