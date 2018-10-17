document.addEventListener("DOMContentLoaded", () => {
  //   console.log("loaded");
  fetch("http://localhost:3000/dogs")
    .then(function(response) {
      return response.json();
    })
    .then(function(dog) {
      console.log(dog);

      let name = document.getElementById("name");
      name.innerHTML += `<td>${dog.name}</td>`;

      let breed = document.getElementById("breed");
      breed.innerHTML += `<td>${dog.breed}</td>`;

      let sex = document.getElementById("sex");
      sex.innerHTML += `<td>${dog.sex}</td>`;
    });
});
