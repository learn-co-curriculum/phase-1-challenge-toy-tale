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



const fetchToys = () => {

}

const createToy = (toy) => {

}

const submitForm = (submit) => {
    submit.preventDefault()
    let toy = {
      name: submit.target.name.value,
      image: submit.target.image.value,
      likes: 0
    }
    addWithObj(toy)
}

//if bool == true, then we edit the likes, if not, we edit everything
const addWithObj = (toyObj) => {
  fetch("http://localhost:3000/toys",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({toys:toyObj})
  })

  .then(r => r.json())
  .then(data => {
    console.log("added the data to the thing")
    createToy(toy)
  })
}