let addToy = false;
const toyCollection = document.querySelector('#toy-collection')

const handleGETToys = () => {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(handleFetchSuccess)
    .catch(handleError)
}

const handleFetchSuccess = (data) => data.forEach(renderToyCard)

const createHTMLElement = (tag, className, textContent, src, id) => {
  const element = document.createElement(tag)
  if(className) element.className = className
  if(textContent) element.textContent = textContent
  if(src) element.src = src
  if(id) element.id = id
  return element
}

const renderToyCard = (toy) => {
  const div = createHTMLElement('div', 'card')
  div.appendChild(createHTMLElement('h2', null, toy.name))
  div.appendChild(createHTMLElement('img', 'toy-avatar', null,toy.image))
  div.appendChild(createHTMLElement('p', null, `${toy.likes} Likes`))
  const button = createHTMLElement('button', 'like-btn', `Like ❤️`, null, `${toy.id}`)
  button.style.cursor = 'pointer'
  button.addEventListener('click', handlePATCHLikes)
  div.appendChild(button)
  toyCollection.appendChild(div)
}

const handleError = () => alert('Something went wrong when fetching!')

const createToy = (e) => {
  e.preventDefault()
  const newToyName = e.target[0].value
  const newToyImgURL = e.target[1].value
  handlePOSTToys(newToyName, newToyImgURL)
  e.target[0].value = ''
  e.target[1].value = ''
}

const handlePOSTToys = (newToyName, newToyImgURL) => {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name" : newToyName,
      "image" : newToyImgURL,
      "likes" : 0
    })
  })
  .then(res => res.json())
  .then(data => handlePOSTSuccess(data))
  .catch(handleError)
}

const handlePATCHLikes = (event) => {
  let numOfLikes = parseInt(event.target.previousSibling.textContent.split(' ')[0])
  numOfLikes += 1
  const toyId = event.target.id
  fetch(`http://localhost:3000/toys/${toyId}`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      'likes': numOfLikes
    })
  })
  .then(res => res.json())
  .then(data => updateLikes(data, event))
  .catch(handleError)
}

const updateLikes = (toyData,e) => e.target.previousSibling.textContent = `${toyData.likes} Likes`

const handlePOSTSuccess = (toyData) => renderToyCard(toyData)

const initApp = () => {
  handleGETToys()
}

document.addEventListener("DOMContentLoaded", () => {
  initApp()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener('submit', createToy)
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
