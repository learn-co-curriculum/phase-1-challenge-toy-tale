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

// page load get request to fetch all toyObject {}
// <div class="card"> for each toy
// add to toy-collection div

// each card has h2, img, p, button
{/* <div class="card">
  <h2>Woody</h2>
  <img src="[toy_image_url]" class="toy-avatar" />
  <p>4 Likes</p>
  <button class="like-btn" id="[toy_id]">Like ❤️</button>
</div> */}

// toyDATA = [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…} ]
  // [id, name, image, likes]

const url = "http://localhost:3000/toys"
const collection = document.getElementById("toy-collection")


fetch(url)
.then((response) => response.json())
.then((toyData) => toyData.forEach((toy) => renderOneToy(toy)))

//for Each

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
      // Update the DOM however you want in here
      toy.likes = singleToy.likes
      p.textContent = `${singleToy.likes} likes`
    })
    .catch((e) => alert(e.message))
  });

  delButton.addEventListener("click", (event) => {
    // target the card
    // console.log(event.target)
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
  })
    // the remove from dom
}



 // use submit button to enter toy
 // input target
 // add event listener
 //

const form = document.querySelector("form")

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
    .catch()
})







 // headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// })
