require('dotenv').config()
const express = require('express');
const cors = require('cors');
const path = require('path');
const {SERVER_PORT} = process.env
const {CONNECTION_STRING} = process.env
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'))

const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})



app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
})

app.post('/', (req, res) => {
    let pokeArr = req.body
    sequelize.query(`
        INSERT INTO pokemon (poke_name, poke_id, poke_order, poke_height, poke_weight)
        VALUES ('${pokeArr[0]}',${pokeArr[1]},${pokeArr[2]},${pokeArr[3]},${pokeArr[4]})
    `).then(dbRes => {
        console.log(dbRes[0])
        res.sendStatus(200)
    }).catch(err => console.log(err))
})



app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))