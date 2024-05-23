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
const toyCard = document.querySelector(".card")
// toyData = [ {id, name, image, likes} ]

fetch(url)
.then((respone) => respone.json())
.then((toyData) => toyData.forEach(toy => renderOneToy(toy)))

function renderOneToy(toy) {

  const div = document.createElement("div")
  const h2 = document.createElement("h2")
  const img = document.createElement("img")
  const p = document.createElement("div")
  const button = document.createElement("button")
  const delButton = document.createElement("button")

  div.classList.add("card")
  h2.textContent = `${toy.name}`
  img.src = toy.image
  img.classList.add("toy-avatar")
  p.textContent = `${toy.likes} likes`
  button.classList.add("like-btn")
  button.id = `${toy.id}`
  button.textContent ="Like ❤️"
  delButton.textContent ="Give to Sid"
  delButton.id = "delete-btn"

  collection.appendChild(div)
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
  div.appendChild(delButton)

  button.addEventListener("click", () => {
    toy.likes++
    p.textContent = `${toy.likes} likes`

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type" : `application/json`,
        Accept: "application/json"
      },
      body: JSON.stringify( {
        "likes": `${toy.likes}`
      }),
    })
    .then((response) => response.json())
    .then((data) => console.log (data))
  })

  delButton.addEventListener("click", () => {
    const cardDelete = delButton.closest('.card')
    cardDelete.remove()
    handleDelete(toy.id)
  })

}

const form = document.querySelector(".add-toy-form") 

form.addEventListener("submit", (event) => {
  event.preventDefault()
  const toyInput = (document.querySelectorAll(".input-text")[0].value)
  const imageInput = (document.querySelectorAll(".input-text")[1].value)

  let newToy = {
    name: toyInput,
    image: imageInput,
    likes: 0
  }
  fetch(url, {
    method: "POST",
    headers: 
  {
    "Content-Type" : `application/json`,
    Accept: "application/json",
  },
    body: JSON.stringify(newToy),
  })
  .then((response) => response.json())
  .then((toyData) => renderOneToy(toyData)) // returns what was added // function
})

function handleDelete(id) {
  fetch(`http://localhost:3000/toys/${id}` , {
    method: "DELETE",
    headers: {
      "Content-Type" : `application/json`,
       Accept: "application/json",
    },
  })
  .then((response) => response.json())
  .then((delateData) => console.log(delateData))
}
