document.addEventListener('DOMContentLoaded', () => {

    // Fetch (haha get it? fetch.) dogs
    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(response => {
        const dogs = response;

        // Get table body
        const tableBody = document.getElementById('table-body')

        // Populate table with dog info
        dogs.forEach(function(dog) {
            tableBody.innerHTML += 
            `<tr>
                <td>${dog.name}</td>
                <td>${dog.breed}</td>
                <td>${dog.sex}</td>
                <td><button class="edit-button" data-id=${dog.id}>Edit Dog</button></td>
            </tr>`
        })

        // Add Edit Dog event listener
        document.addEventListener('click', function(event) {
            if (event.target.className === "edit-button") {
                const dogForm = document.getElementById('dog-form')
                dog = dogs[event.target.dataset.id - 1]; //dogs.find was acting REALLY weird here; discuss later
                dogForm.children[0].value = dog.name;
                dogForm.children[1].value = dog.breed;
                dogForm.children[2].value = dog.sex;
            }

            // Add Edit Dog Submit event listener
            const submitButton = document.getElementById('edit-submit');
            
            submitButton.addEventListener('click', function(event) {
                event.preventDefault();

                const dogForm = document.getElementById('dog-form');
                const id = dog.id;
                const data = {
                    name: dogForm.children[0].value,
                    breed: dogForm.children[1].value,
                    sex: dogForm.children[2].value
                }
                
                // Post changes to DB
                fetch(`http://localhost:3000/dogs/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                }).then(function() {

                    // Render changes to page
                    // Fetch (haha get it? fetch.) dogs
                    fetch("http://localhost:3000/dogs")
                    .then(response => response.json())
                    .then(response => {
                        const dogs = response;

                        // Get table body
                        const tableBody = document.getElementById('table-body')

                        // Clear table body
                        tableBody.innerHTML = "";

                        // Populate table with dog info
                        dogs.forEach(function(dog) {
                            tableBody.innerHTML += 
                            `<tr>
                                <td>${dog.name}</td>
                                <td>${dog.breed}</td>
                                <td>${dog.sex}</td>
                                <td><button class="edit-button" data-id=${dog.id}>Edit Dog</button></td>
                            </tr>`
                        })
                    })
                })
            })
        })
    })
})