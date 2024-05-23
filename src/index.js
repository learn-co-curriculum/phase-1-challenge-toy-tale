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

const url = "http://localhost:3000/toys"
const collection = document.getElementById("toy-collection") 
// toy data = [ {id, name, image, likes] } array of objects

fetch(url)
  .then((response) => response.json())
  .then((toyData)  => toyData.forEach(toy => renderOneCard(toy)))


function renderOneCard(toy) {

  const div = document.createElement("div")
  const h2 = document.createElement("h2")
  const img = document.createElement("img")
  const p = document.createElement("p")
  const button = document.createElement("button")

  div.className = "card"
  h2.innerText = toy.name
  img.src = toy.image
  img.className = "toy-avatar"
  p.innerText = `${toy.likes} likes` 
  button.className = "like-btn"
  button.id = `${toy.id}`
  button.innerText = "like ❤️"

  collection.appendChild(div)
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)

  button.addEventListener("click", () => {
    toy.likes++
    p.innerText = `${toy.likes} likes`

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: `${toy.likes}`
    }),
  })
  })
}

const form = document.querySelector(".container") 

form.addEventListener("submit", (event) => {
  event.preventDefault()

  const toyValue = document.querySelectorAll(".input-text")[0].value
  const imageValue = document.querySelectorAll(".input-text")[1].value 

let newToy = {
    name: toyValue,
    image: imageValue,
    likes: 0
  }

  fetch(url, {
    method: "POST",
    headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify(newToy),
})
  .then((response) => response.json())
  .then((toy)  => renderOneCard(toy))
})

// grab like button
// 
const allButtons = document.querySelectorAll(".like-btn")

// // allButtons.forEach((button) => {
// //   button.addEventListener("click", () => {
// //     console.log(click)
// //     // toy.likes++
// //     // p.textContent = `${toy.likes} likes`
//   })
// })
