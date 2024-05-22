let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      } else {
      toyFormContainer.style.display = "none";
      }
    });
});
/////////////////////////////////////////////////////////////////////////////
const toyURL = "http://localhost:3000/toys"
const toyCollection = document.getElementById("toy-collection") 

function renderOneToy(toy) {
  //build card
  let card = document.createElement('div')
  card.classList.add("card")
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>`
    toyCollection.appendChild(card)
  const button = document.getElementById(`${toy.id}`)
  button.addEventListener("click", () => {
    toy.likes++
    card.querySelector("p").textContent = `${toy.likes} likes` 

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      header: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes" : `${toy.likes}`
      })
    })
  })
}


function getAllToys() {
  fetch(toyURL)
  .then((response) => response.json())
  .then((toyData) => toyData.forEach(toy => renderOneToy(toy)))
}

const form = document.querySelector("form.add-toy-form")

form.addEventListener("submit", handlesSubmit)

function handlesSubmit(event) {
  event.preventDefault();
  const toyValue = document.getElementById("nameInput").value
  const imageValue = document.getElementById("picInput").value

  let newToyObject = {
    name: toyValue,
    image: imageValue,
    likes: 0,
  };
  addNewToy(newToyObject)
}

function addNewToy(newToyObject) {

  const configArray = {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToyObject)
  }
  fetch(toyURL, configArray)
    .then((response)=> response.json())
    .then((toyData) => renderOneToy(newToyObject))
}

function initialize() {
  getAllToys()
}

initialize()
