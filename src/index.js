document.addEventListener('DOMContentLoaded', () => {
    //fetch(hahahaha) the dogs from the server
    //then call the displayDogs function
    // fetch('http://localhost:3000/dogs', {

    // }).then(resp => resp.json()).then(data => displayDogs(data));
    getDogs()
    //form at the top populates with the dogs info when edit button is clicked
    // submit button then creates patch request and then the dom updates
    document.querySelector('#dog-form').addEventListener('submit', event => {
        event.preventDefault();
        //parse out the data to get it ready for a patch request
        let updatedInfo = {}
        updatedInfo.name = event.target.name.value
        updatedInfo.breed = event.target.breed.value
        updatedInfo.sex = event.target.sex.value
        updatedInfo.id = event.target.id.value
        //call a patch request for editing the
        updateDog(updatedInfo);

    })

    document.addEventListener('click', event => {
        if (event.target.className === 'edit-btn') {
            inputDogToEditForm(event.target.parentNode.parentNode);
        }
    })

})

function getDogs() {

    fetch('http://localhost:3000/dogs', {

    }).then(resp => resp.json()).then(data => displayDogs(data));
}


function displayDogs(data) {
    //get element where we want to put the dogs
    let table = document.querySelector('#table-body')
    table.innerHTML = "";

    //loop through dogs and put them in the html
    data.forEach(dog => {
        //put name, breed, sex, and edit button 
        table.innerHTML += `<tr data-dogId="${dog.id}"><td>${dog.name}</td><td>${dog.breed}</td><td>${dog.sex}</td><td><button class="edit-btn">Edit</button></td></tr>`
    })
}

function updateDog(dogObj) {

    fetch(`http://localhost:3000/dogs/${dogObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(dogObj)
    }).then(resp => resp.json()).then(() => getDogs()).then(clearEditForm())
}

function inputDogToEditForm(html) {
    let form = document.querySelector('#dog-form')
    form.id.value = html.dataset.dogid
    form.name.value = html.children[0].innerText
    form.breed.value = html.children[1].innerText
    form.sex.value = html.children[2].innerText

}

function clearEditForm() {
    let form = document.querySelector('#dog-form')
    form.id.value = ""
    form.name.value = ""
    form.breed.value = ""
    form.sex.value = ""
}