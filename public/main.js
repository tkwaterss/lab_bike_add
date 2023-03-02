//pm2 name "Bike"
//ip - 18.221.63.3

let image = document.querySelector('img')
let main = document.querySelector('main')
let pokeName = document.querySelector('h1')
let form = document.querySelector('form')
let search = document.querySelector('#search')

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
        pokeName.textContent = name
        axios.post(`/`, pokemon)
    }).catch(err => console.log(err))
}

const searchPokemon = event => {
    event.preventDefault();
    let pokemon = search.value;
    console.log(pokemon)
    axios.get(`${pokeURL}/${pokemon}`)
    .then(response => {
        let {name, id, order, height, weight} = response.data
        let pokeArr = [name, id, order, height, weight]
        image.src = response.data.sprites.front_default
        pokeName.textContent = name
        axios.post(`/`, pokeArr)
    }).catch(err => console.log(err))
}


form.addEventListener('submit', searchPokemon)
image.addEventListener('click', getRandomSprite)