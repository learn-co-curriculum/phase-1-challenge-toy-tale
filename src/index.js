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

function renderOneToy(toy) {
  //build card
  let card = document.createElement('div')
  card.classList.add("card")
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes}</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>`
    // toy card to DOM
    toyCollection.appendChild(card)
  const button = document.getElementById(`${toy.id}`)
  button.addEventListener("click", () => {
    toy.likes += 1
    card.querySelector("p").textContent = toy.likes
  // tie what im doing to one toy back to event listener
    })
}
// for one toy
// so i want to target likes
  // each click +1
  // toy.likes =
  // target the p text is toy.likes
// newToyObject = {
  // name: toyValue,
  // image: imageValue,
  // likes: 0,}


const toyURL = "http://localhost:3000/toys"
const toyCollection = document.getElementById("toy-collection") 

function getAllToys() {
  fetch(toyURL)
  .then((response) => response.json())
  .then((toyData) => toyData.forEach(toy => renderOneToy(toy)))
}
 
// toyDate [ { id: value, name:  ,image: , likes: } ]  and array of objects

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

//add event listener to like button
// get button
// add eventlistner to button
//



function initialize() {
  getAllToys()
}

initialize()
