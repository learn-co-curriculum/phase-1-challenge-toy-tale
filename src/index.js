let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys();
});

const toyUrl = "http://localhost:3000/toys";
const toyCollection = document.getElementById('toy-collection');

function fetchToys() {
  fetch(toyUrl)
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        createToyCard(toy);
      });
      addLikeEventListeners();
      addDeleteEventListeners();
    })
    .catch(error => console.error('Error fetching toys:', error));
}

function createToyCard(toy) {
  const toyCard = document.createElement('div');
  toyCard.className = 'card';

  toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
    <button class="delete-btn" id="delete-${toy.id}">Delete 🗑️</button>
  `;

  toyCollection.appendChild(toyCard);
}

const addToyForm = document.getElementById('add-toy-form');
addToyForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('toy-name').value;
  const image = document.getElementById('toy-image').value;

  const newToy = {
    name: name,
    image: image,
    likes: 0
  };

  fetch(toyUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  })
    .then(response => response.json())
    .then(toy => {
      createToyCard(toy);
      addToyForm.reset();
      addLikeEventListeners();
      addDeleteEventListeners();
    })
    .catch(error => console.error('Error adding toy:', error));
});

function addLikeEventListeners() {
  const likeButtons = document.querySelectorAll('.like-btn');

  likeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.id;
      const likesElement = event.target.previousElementSibling;

      const newLikes = parseInt(likesElement.textContent) + 1;

      fetch(`${toyUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ likes: newLikes })
      })
        .then(response => response.json())
        .then(toy => {
          likesElement.textContent = `${toy.likes} Likes`;
        })
        .catch(error => console.error('Error updating likes:', error));
    });
  });
}

function addDeleteEventListeners() {
  const deleteButtons = document.querySelectorAll('.delete-btn');

  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.id.split('-')[1];

      fetch(`${toyUrl}/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          event.target.closest('.card').remove();
        })
        .catch(error => console.error('Error deleting toy:', error));
    });
  });
}
