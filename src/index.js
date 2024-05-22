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
    <button class="like-btn" id="[toy_id]">Like ❤️</button>`
    // toy card to DOM
    toyCollection.appendChild(card)
}


const toyURL = "http://localhost:3000/toys"
const toyCollection = document.getElementById("toy-collection") 

function getAllToys() {
  fetch(toyURL)
  .then((response) => response.json())
  .then((toyData) => toyData.forEach(toy => renderOneToy(toy)))
}
 
// toyDate [ { id: value, name:  ,image: , likes: } ]  and array of objects

  // add NEW TOY
  // handle toy submit
  // get form
// const form = document.querySelector("form.add-toy-form")

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const toyInput =document.querySelector("form.add-toy-form")[0]
//   console.log(toyInput)

  // const imageInput = 

  // target input
  //
    // post request 
  // const to pass as second arg to POST fetch
// function getNewToy(toyData) {

  // const configArray = {
  //   method: "POST",
  //   headers: 
  //   {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json"
  //   },
  //   body: JSON.stringify({
  //     "name": toyData.name,
  //     "image": toyData.image,
  //     "like": toyData.likes,
  //   })
  // }
  // fetch(toyURL, configArray)
  //   .then((response)=> response.json())
  //   .then((toyData) => console.log(toyData))
  


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


function initialize() {
  getAllToys()
}

initialize()
