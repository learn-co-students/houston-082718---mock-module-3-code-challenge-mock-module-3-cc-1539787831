document.addEventListener('DOMContentLoaded', () => {

    showDogs();

    function showDogs() {
        
        // On page load, render a list of already registered dogs in the table.
        fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogs => {
    
            // The dog should be put on the table as a table row.
            dogTable = document.getElementById('dog-table');
            dogTable.innerHTML = `<thead class='blue'>
                    <tr class='padding'>
                        <th class='padding center'>Name</th>
                        <th class='padding center'>Breed</th>
                        <th class='padding center'>Sex</th>
                        <th class='padding center'>Edit Dog</th>
                    </tr>
                </thead>`;
    
            dogs.forEach((dog) => {
                dogTable.innerHTML += `<tr>
                    <td>${dog.name}</td> 
                    <td>${dog.breed}</td> 
                    <td>${dog.sex}</td> 
                    <td><button data-id="edit-btn" id="${dog.id}">Edit</button></td>
                    </tr>`;
            })
    
            // Clicking on the edit button next to a dog should populate the top 
            // form with that dog's current information.
            document.addEventListener('click', (event) => {
                event.preventDefault();
                
                if (event.target.dataset.id === 'edit-btn') {
    
                    let editButton = event.target;
                    let dogId = editButton.id;
                    let dogRow = editButton.parentNode.parentNode.children;
                    let dogName = dogRow[0].innerText;
                    let dogBreed = dogRow[1].innerText;
                    let dogSex = dogRow[2].innerText;
                        
                    const nameEl = document.getElementById('name');
                    const breedEl = document.getElementById('breed');
                    const sexEl = document.getElementById('sex');
    
                    nameEl.value = dogName;
                    breedEl.value = dogBreed;
                    sexEl.value = dogSex;
    
                    // On submit of the form, a PATCH request should be made to update 
                    // the dog information (including name, breed and sex attributes).
                    let submitButton = document.getElementById('submit');
                    submitButton.addEventListener('click', (event) => {
                        event.preventDefault();
    
                        const nameEl = document.getElementById('name');
                        const breedEl = document.getElementById('breed');
                        const sexEl = document.getElementById('sex');
    
    
                        fetch(`http://localhost:3000/dogs/${dogId}`, {
                            method: 'PATCH',
                            body: JSON.stringify({
                                id: dogId,
                                name: nameEl.value,
                                breed: breedEl.value,
                                sex: sexEl.value
                            }),
                            headers: {
                                "Content-Type": "application/json; charset=utf-8"
                            }
                        }).then((response) => {
    
                            // Once the form is submitted, the table should reflect the updated dog information.
                            // search for the table fields you need to edit and update each of them in turn, 
                            // make a new get request for all dogs and rerende all of them in the table
                            showDogs();

                        }) //fetch 'patch'

                    }) // click submit
    
                } // if edit
    
            }) // click edit
    
        }) // showDogs

    } // function showDogs

})