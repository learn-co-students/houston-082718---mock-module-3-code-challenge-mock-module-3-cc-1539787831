document.addEventListener('DOMContentLoaded', () => {
    getData()
    document.addEventListener("click", function(event) {
    if (event.target.className === "edit") {
        const dogId = parseInt(event.target.innerText);
        fetch(`http://localhost:3000/dogs/${dogId}`)
        .then(resp => resp.json())
        .then(dogs => edit(dogs, dogId))
        }
    })
})

function edit(dog, id){
    let editDog = document.querySelector("#dog-form")
    editDog.childNodes[1].value = dog.name
    editDog.childNodes[3].value = dog.breed
    editDog.childNodes[5].value = dog.sex
    
    editDog.addEventListener("submit", function(event){
        event.preventDefault()
        
        let data = {
            name: editDog.childNodes[1].value,
            breed: editDog.childNodes[3].value,
            sex: editDog.childNodes[5].value
        }
        console.log(data)
        postData(`http://localhost:3000/dogs/${id}`, data)
    })
}

function postData(url = `http://localhost:3000/dogs/1`, data = {"name": "good",
"breed": "stuff",
"sex":"bob"}) 
{
    return fetch(url, {
    method: "PATCH", 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify(data), 
})
}

function getData(){
    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(dogs => dogs.forEach(dog => addDogsToPage(dog)))
}

function addDogsToPage(dog){
    let add = document.getElementById("table-body")
    add.innerHTML += `<tr>
    <td>Dog ${dog.name}</td> <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button class="edit" dataset="${dog.id}">${dog.id} Edit</button></td>
    </tr>`
}