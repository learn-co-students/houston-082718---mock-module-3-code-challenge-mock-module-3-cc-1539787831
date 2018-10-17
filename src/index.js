document.addEventListener("DOMContentLoaded", () => {
  const dogForm = document.getElementById("dog-form");
  const dogTable = document.getElementById("table-body");

  fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(resp => {
      let dogs = resp;
      dogs.forEach(function(dog) {
        dogTable.innerHTML += `
      <tr>
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button data-id=${dog.id}>Edit</button></td>
      </tr>
      `;
      });
    });

  document.addEventListener("click", function(event) {
    if (event.target.dataset.id) {
      const formRow = event.target.parentElement.parentElement.children;
      dogForm.children[0].value = formRow[0].innerText;
      dogForm.children[1].value = formRow[1].innerText;
      dogForm.children[2].value = formRow[2].innerText;
      dogForm.children[3].dataset.id = formRow[3].children[0].dataset.id;
    }
  });
});
