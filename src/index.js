let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  let allToysURL = 'http://localhost:3000/toys'

  //Fetch Andys Toys
  //Make GET request
  //Parse Data
  //forEach toy
  //Create required Elements
  //Append to toy-collection

  fetch(allToysURL)
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => {
      let div = document.createElement('div')
      let h2 = document.createElement('h2')
      let toyCollection = document.getElementById('toy-collection')
      let img = document.createElement('img')
      let p = document.createElement('p')
      let btn = document.createElement('button')

      div.classList.add('card')
      h2.innerText = toy.name
      img.src = toy.image
      img.classList.add('toy-avatar')
      p.innerText = 'likes'
      btn.classList.add('like-btn')
      btn.innerText = 'like'
      btn.setAttribute('id', `${toy.id}`)

      toyCollection.appendChild(div)
      div.appendChild(h2)
      div.appendChild(img)
      div.appendChild(p)
      div.appendChild(btn)
    })
  })




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
