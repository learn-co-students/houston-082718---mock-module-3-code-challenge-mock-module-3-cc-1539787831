document.addEventListener('DOMContentLoaded', () => {

    URL = "http://localhost:3000/dogs";

    // FETCH DATA AND RENDER //
    fetch(URL)
    .then(response => response.json())
    .then(dogs => renderDogs(dogs))
    // FETCH DATA AND RENDER //


    // RENDER DOGS TO TABLE //
    tableBody = document.getElementById('table-body');
    function renderDogs(dogs) {
        dogs.forEach(function(dog) {
            tableBody.innerHTML += 
            `<tr>
                <td>${dog.name}</td>
                <td>${dog.breed}</td>
                <td>${dog.sex}</td>
                <td><button class="edit-button" data-id=${dog.id}>Edit Dog</button></td>
            </tr>`
        })
    }
    // RENDER DOGS TO TABLE //


    // ADD EDIT BUTTON LISTENER //
    document.addEventListener('click', function(event) {
        if (event.target.className === "edit-button") {
            fetch(`${URL}/${event.target.dataset.id}`)
            .then(resp => resp.json())
            .then(dog => addDogDataToEditForm(dog))
        }
    })
    // ADD EDIT BUTTON LISTENER //


    // POPULATE EDIT FORM WITH DOG DATA //
    function addDogDataToEditForm(dog) {
        const dogForm = document.getElementById('dog-form');
        dogForm.children[0].value = dog.name;
        dogForm.children[1].value = dog.breed;
        dogForm.children[2].value = dog.sex;

        // ADD SUBMIT BUTTON EVENT LISTENER //
        dogForm.children[3].addEventListener('click', function(event) {
            event.preventDefault();

            const data = {
                name: dogForm.children[0].value,
                breed: dogForm.children[1].value,
                sex: dogForm.children[2].value
            }

            fetch(`${URL}/${dog.id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }).then(function() {
                fetch(URL)
                .then(response => response.json())
                .then(dogs => {
                    tableBody.innerHTML = ''
                    renderDogs(dogs)
                })
            })
        })
        // ADD SUBMIT BUTTON EVENT LISTENER //
    }

})