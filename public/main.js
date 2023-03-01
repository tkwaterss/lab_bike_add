let image = document.querySelector('img')
let main = document.querySelector('main')
let pokeName = document.querySelector('h1')

// image.addEventListener('click', (event) => {
//     alert('CONGRADULATIONS YOU HAVE PURCHASED THIS BIKE FOR $10,000.00! EXPECT IT TO ARRIVE IN 30 YEARS! THANK YOU!!!')
// })


// let imageURL = "https://api.api-ninjas.com/v1/randomimage"
// let category = 'wildlife'

// const getRandomImage = event => {
//     axios.get(imageURL + `?category=${category}`, {
//         headers: {'X-Api-Key': 'cOjzDQqob7Y4BFHJAWPt9A==mp9DUrrYfBWkPfBd', 'Accept': 'image/jpg'}
//     })
//     .then(response => {
//         console.log(response)
//         image.src = `${response.data}`
//     }).catch(err => console.log(err))
// }
let baseURL = "http://localhost:4001"
let pokeURL = "https://pokeapi.co/api/v2/pokemon"

const getRandomSprite = event => {
    let randomId = Math.ceil(Math.random()*1008)
    axios.get(`${pokeURL}/${randomId}`)
    .then(response => {
        console.log(response.data)
        let {name, id, order, height, weight} = response.data
        let pokemon = [name, id, order, height, weight]
        image.src = response.data.sprites.front_default
        pokeName.textContent = response.data.species.name
        axios.post(`${baseURL}`, pokemon)
    }).catch(err => console.log(err))
}



image.addEventListener('click', getRandomSprite)