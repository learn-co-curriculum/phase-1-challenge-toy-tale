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
const collection = document.querySelector("#toy-collection")
//toyData = [ {id, name, image, likes}]

fetch("http://localhost:3000/toys")
.then((response) => response.json())
.then((toyData) => toyData.forEach((toy) => renderOneToy(toy)))

function renderOneToy(toy) {

  const div = document.createElement("div")
  const h2 = document.createElement("h2")
  const img = document.createElement("img")
  const p = document.createElement("p")
  const button = document.createElement("button")
  const deleteButton = document.createElement("deleteButton")

  div.classList.add("card")
  h2.textContent = `${toy.name}`
  img.src = toy.image
  img.classList.add("toy-avatar")
  p.textContent = `${toy.likes} likes` 
  button.class = "like-btn"
  button.id = `${toy.id}`
  button.textContent = "Like ❤️"
  deleteButton.textContent = "Give to Sid"
  deleteButton.id = "delete-btn"

  collection.appendChild(div)
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
  div.appendChild(deleteButton)
}

// target the submit
