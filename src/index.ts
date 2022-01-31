import express from 'express';
import cors from 'cors';
import { URLController } from './controllers/URLController'
import { MongoConnection } from './database/MongoConnections'


const api = express();

api.use(cors())
api.use(express.json())

const database = new MongoConnection()
database.connect()


const urlController = new URLController()
api.post('/shorten-url', urlController.shorten)
api.get('/:hash', urlController.redirect)


const port = process.env.PORT || 5000

api.listen(port, () => {
  console.log("Server listening on port " + port)
})