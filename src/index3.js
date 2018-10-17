document.addEventListener("DOMContentLoaded", () => {
  //   console.log("loaded");
  fetch("http://localhost:3000/dogs")
    .then(function(response) {
      return response.json();
    }) // --> end of first then
    .then(function(dogs) {
      dogs.forEach(function(dog) {
        document.querySelector("#dog-div").innerHTML += `<div><button>${
          dog.name
        }</button><button>${dog.breed}</button><button>${
          dog.sex
        }</button><div><br>`;
      }); // --> end of for each
    }); //--> end of second then

  document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const data = { name: event.target.name.value };

    fetch("http://localhost:3000/dogs", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function() {
      dogs.forEach(function(dog) {
        document.querySelector("#dog-div").innerHTML += `<div><button>${
          dog.name
        }</button><button>${dog.breed}</button><button>${
          dog.sex
        }</button><div><br>`;
      }); // --> end of for each
    }); //--> end of second then
  });
}); //--> end of dom listener
