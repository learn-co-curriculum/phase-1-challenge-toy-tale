let addToy = false;
let toysArray
const toyCollection = document.getElementById('toy-collection')
const addToyForm = document.querySelector('.add-toy-form')
const newToyName = document.getElementsByClassName('input-text')[0]
const newToyImage = document.getElementsByClassName('input-text')[1]

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

const toyCardServerToDom = () => {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(resp => {
    toysArray = resp
    return resp
  })
  .then(array => {
    array.forEach(toy => {
      const cardContents =
        `<H2>${toy.name}</H2>
        <img src="${toy.image}" class="toy-avatar">
        <p class="${toy.name}">${toy.likes} Likes</p>
        <button class="like-btn" id="${toy.id}">Like ❤️</button>
        <button class="delete-btn" id="${toy.id}-for-delete">Delete</button>`

      const createDiv = document.createElement('div')
      createDiv.classList.add('card')

      toyCollection.appendChild(createDiv).innerHTML = cardContents

      addDeleteButtonListener(toy)

      addLikeButtonListener(toy)
    })
  })
}

toyCardServerToDom()

addToyForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const requestBody = {
    "name": `${newToyName.value}`,
    "image": `${newToyImage.value}`,
    "likes": 0
  }
  fetchNewToy(requestBody)
})

  const fetchNewToy = (requestBody) => {
    const options = {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(requestBody)
    }
  fetch('http://localhost:3000/toys', options)
    .then(resp => resp.json())
    .then(resp => {
      const cardContents =
        `<H2>${resp.name}</H2>
        <img src="${resp.image}" class="toy-avatar">
        <p class="${resp.name}">${resp.likes} Likes</p>
        <button class="like-btn" id="${resp.id}">Like ❤️</button>
        <button class="delete-btn" id="${resp.id}-for-delete">Delete</button>`

      const createDiv = document.createElement('div')
      createDiv.classList.add('card')
      toyCollection.appendChild(createDiv).innerHTML = cardContents

      addDeleteButtonListener(resp)
      addLikeButtonListener(resp)
    })
}

const addLikeButtonListener = (toy) => {
  const likeButton = document.getElementById(`${toy.id}`)

  likeButton.addEventListener('click', (event) => {
    event.preventDefault()
    updateLikes(toy)
  })
}

const addDeleteButtonListener = (toy) => {
  document.getElementById(`${toy.id}-for-delete`).addEventListener('click', (event) => {
    event.preventDefault()
    deleteCard(toy.id)
  })
}

const updateLikes = (toy) => {
  const likesDisplay = document.getElementsByClassName(`${toy.name}`)[0].textContent.split(" ")[0]
  const options = {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": parseInt(likesDisplay) + 1
    })
  }

  fetch(`http://localhost:3000/toys/${toy.id}`, options)
    .then(resp => {
      return resp.json()
    })
    .then(resp => {
      document.getElementsByClassName(`${toy.name}`)[0].textContent = `${resp.likes} Likes`
    })
}

const deleteCard = (toy) => {
  const options = {
    method: 'DELETE',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }
  fetch(`http://localhost:3000/toys/${toy}`, options)
  .then(_resp => document.getElementById(`${toy}`).parentElement.remove())
}
