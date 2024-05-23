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
const form = document.querySelector("form")

fetch(url)
.then((response) => response.json())
.then((toyData) => toyData.forEach((toy) => renderOneToy(toy)))

function renderOneToy(toy) {

  const div = document.createElement("div")
  const h2 = document.createElement("h2")
  const img = document.createElement("img")
  const p = document.createElement("p")
  const button = document.createElement("button")
  const delButton = document.createElement("button")

  div.classList.add("card")
  h2.textContent = `${toy.name}`
  img.src = `${toy.image}`
  img.classList.add("toy-avatar")
  p.textContent = `${toy.likes} likes`
  button.classList.add("like-btn")
  button.id = "[toy_id]"
  button.textContent = "Like ❤️"
  delButton.textContent = "Give to Sid"
  delButton.id = "delete-btn"

  collection.appendChild(div)
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
  div.appendChild(delButton)

  button.addEventListener("click", () => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: `${Number(toy.likes) + 1}`
      })
    })
    .then((response) => response.json())
    .then((singleToy) => {
      toy.likes = singleToy.likes
      p.textContent = `${singleToy.likes} likes`
    })
    .catch((e) => alert(e.message))
  });

  delButton.addEventListener("click", (event) => {

    const removeCard = event.target.parentNode

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    })
    .then((response) => response.json())
    .then(() => removeCard.remove())
    .catch((e) => alert(e.message))
  })
}

form.addEventListener("submit", (event) => {
  event.preventDefault()

  const toyInput = document.querySelectorAll(".input-text")[0].value
  const imageInput = document.querySelectorAll(".input-text")[1].value

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
      Accept: "application/json"
    },
    body: JSON.stringify(newToy),
  })
    .then((response) => response.json())
    .then((newToyData) => renderOneToy(newToyData))
})
