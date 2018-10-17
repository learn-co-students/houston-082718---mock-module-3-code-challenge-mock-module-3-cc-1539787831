document.addEventListener('DOMContentLoaded', () => {
    getData()
    document.addEventListener("click", function(event) {
    if (event.target.className === "edit") {
        const dogId = parseInt(event.target.innerText);
        fetch(`http://localhost:3000/dogs/${dogId}`)
        .then(resp => resp.json())
        .then(dogs => edit(dogs))
        }
    })
})

function postData(url = `http://localhost:3000/api/v1/notes`, data = {"title": "good",
"body": "stuff",
"user":"bob"}) 
{
    return fetch(url, {
    method: "POST", 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify(data), 
})
}

function edit(dog, id){
    let editDog = document.querySelector("#dog-form")
    // event.preventDefault()
    let name = editDog.childNodes[1].value = dog.name
    let breed = editDog.childNodes[3].value = dog.breed
    let sex = editDog.childNodes[5].value = dog.sex
    
    addToy.addEventListener("submit", function(event){
        // event.preventDefault()
        debugger
        
        // let data = {
        //     name: name,
        //     breed: breed,
        //     sex: sex,
        // }
        
        return fetch(`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
            name: name,
            breed: breed,
            sex: sex,
        })
        })
    })
}

// function postData(url = `http://localhost:3000/api/v1/notes`, data = {"title": "good",
// "body": "stuff",
// "user":"bob"}) 
// {
//     return fetch(url, {
//     method: "POST", 
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//     },
//     body: JSON.stringify(data), 
// })
// }

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