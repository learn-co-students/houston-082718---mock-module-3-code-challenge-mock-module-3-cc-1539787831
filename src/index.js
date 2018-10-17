document.addEventListener('DOMContentLoaded', () => {
  const URL = 'http://localhost:3000/dogs'
  //find element in document to attach the dogs to
  let tableBody = document.getElementById('table-body')
  //fetch dogs data
  fetch(URL)
  .then(response => response.json())
  .then(function(data) {
    let dogsData = data
    //display all the dogs data in the table
    dogsData.forEach(function(dog) {
      tableBody.innerHTML += `<tr>
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td><center><button data-name=${dog.name} data-id=${dog.id}>Edit</button></center></td>
      </tr>
      `
    })
  })
  //Make a dog editable
  //create event for edit button
  document.addEventListener('click', function(event) {
    if (event.target.dataset.name !== undefined) {
      //populate form with specific dog info
      dogForm = document.getElementById('dog-form')
      dogForm.name.value = event.target.dataset.name
      dogForm.breed.value = event.target.parentNode.parentNode.parentNode.childNodes[3].innerText
      dogForm.sex.value = event.target.parentNode.parentNode.parentNode.childNodes[5].innerText
      let dfId = event.target.dataset.id
      //add submit listener for form
      dogForm.addEventListener('submit', function(event) {
        fetch(`${URL}/${parseInt(dfId)}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: event.target.name.value,
            breed: event.target.breed.value,
            sex: event.target.sex.value
          })
        })
      })
    }
  })
})