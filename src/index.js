document.addEventListener('DOMContentLoaded', () => {
    function fetchAndRender() {
        fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then(data => dogs = data)
        .then(dogs => {
            table = document.getElementById('table-body')
            table.innerHTML = ''
            dogs.forEach(dog => {
                renderDogToTable(dog)
            });
        })
    }
    fetchAndRender()
    
    form = document.getElementById('dog-form')
    form.addEventListener('submit', function(event) {
        event.preventDefault()
        event.stopPropagation()
        const data = {
            id: event.target.name.id,
            name: event.target.name.value,
            breed: event.target.breed.value,
            sex: event.target.sex.value
        }
        // dogID = event.target.name.id
        fetch(`http://localhost:3000/dogs/${data.id}`, { 
            method: 'PATCH',
            headers: {  
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(fetchAndRender())
    })
    
    function renderDogToTable(dog) {
        table = document.getElementById('table-body')
        row = document.createElement('tr')
        row.innerHTML = `<td id=${dog.id}>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class='editButton'>Edit</button></td>`
        table.appendChild(row)
    }

    let table = document.getElementById('table-body')
    table.addEventListener('click', function(event) {
        console.log(event.target)
        if (event.target.className === 'editButton') {
            form = document.getElementById('dog-form')
            dogName = event.target.parentNode.parentNode.children[0].innerText
            dogBreed = event.target.parentNode.parentNode.children[1].innerText
            dogSex = event.target.parentNode.parentNode.children[2].innerText
            dogID = event.target.parentNode.parentNode.children[0].id
            form.name.value = dogName
            form.breed.value = dogBreed
            form.sex.value = dogSex
            form.name.id = dogID
        }
    })

})