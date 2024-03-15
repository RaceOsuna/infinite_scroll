
const apiKey = "dxOYIbk4KJe2tnKi2n4kTNIV73Q7_m7pYrS9eJtTO8k"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=30`

const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")
const photo = document.getElementById("photo")

let photosArray = [];
let ready =  false;
let count = 0;

const loadImage = () => {
  count++;
  hideLoader()
  if (count === photosArray.length) {
    count = 0
    ready = true;
  }
}

const displayPhotos = () => {
  photosArray.flat().forEach(photo => {
    imageContainer.innerHTML += 
    `
      <a class="photo" id="photo" href=${photo.links.html} target="_blank">
        <img class="img" src=${photo.urls.regular} alt=${photo.alt_description} title=${photo.alt_description}>
      </a>
    `
    const img = document.querySelector(".img")
    img.addEventListener("load", loadImage)
  })
}

const hideLoader = () => {
    loader.setAttribute('hidden', true)
}

const getPhotos = () => {
  fetch(apiUrl)
  .then(res => {
    if (res.ok) {
      console.log(res)
      return res.json()
    } else {
      throw new Error(`error: ${res.status}, ${res.message}`)
    }
  })
  .then(data => {
    photosArray = data
    console.log('here',photosArray)
    displayPhotos()
    ready = false
  })
  .catch(error => console.log(error))
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    getPhotos()
    ready = false
  }
})

getPhotos()