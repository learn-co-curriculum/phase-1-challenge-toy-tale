let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  let allToysURL = 'http://localhost:3000/toys'

  function displayAllToys() {
    fetch(allToysURL)
    .then(res => res.json())
    .then(createToyCard)
  }

  function createToyCard(toys) {
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
      p.innerText = `${toy.likes} likes`
      btn.classList.add('like-btn')
      btn.innerText = 'like'
      btn.setAttribute('id', `${toy.id}`)

      toyCollection.appendChild(div)
      div.appendChild(h2)
      div.appendChild(img)
      div.appendChild(p)
      div.appendChild(btn)

      btn.addEventListener('click', () => {
        let newNumberOfLikes = toy.likes += 1
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: 'PATCH',
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": newNumberOfLikes
          })
        })
        .then(p.innerText = `${toy.likes} likes`)
      })
    })
  }

  function addNewToy() {
    let form = document.querySelector('form.add-toy-form')

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      toyName = e.target.name.value
      toyImgSrc = e.target.image.value

      let newToy = {
        'name': `${toyName}`,
        'image': `${toyImgSrc}`,
        'likes': 0
      }

      fetch(allToysURL, {
        method: 'POST',
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newToy)    
      })
      .then(displayAllToys)
    })
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

  displayAllToys()
  addNewToy()
});
