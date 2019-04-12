const express = require('express') // yarn add express //yarn add nodemon -D // yarn dev // yarn add mongoose // multer //socket.io // cors
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors()) // Para o front ter acesso ao back

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on("connection", socket => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
})

//Conexao com o banco na nuvem
mongoose.connect('mongodb+srv://omnistack:94311526@cluster0-lcswi.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true
})

app.use((req, res, next) => {
    req.io = io

    return next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require('./routes'))

server.listen(process.env.PORT || 3333)


