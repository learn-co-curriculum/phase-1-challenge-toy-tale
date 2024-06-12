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

function fetchToys(toys){
  const toyCollection = document.querySelector(".toy-collection")
  const header = document.createElement("h2")
  const image = document.createElement("img")
  const likes = document.createElement("p")
  const button = document.createElement("button")
  
  header.textContent = toys.name
  image.src = toys.image
  likes.textContent = toys.likes
  button.textContent = "Like <3"

  toyCollection.appendChild(header, image, likes, button)
}

