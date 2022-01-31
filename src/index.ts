import express from 'express';

const api = express();

const port = process.env.PORT || 5000

api.listen(port, () => {
  console.log("Server listening on port " + port)
})