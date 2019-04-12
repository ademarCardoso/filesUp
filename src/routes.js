const express = require('express')
const multerConfig = require('./config/multer')
const multer = require('multer')

const routes = express.Router()

const BoxController = require('./controlers/BoxController')
const FileController = require('./controlers/FileController')

routes.post("/boxes", BoxController.store)
routes.get("/boxes/:id", BoxController.show)

routes.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store)

module.exports = routes