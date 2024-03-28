import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
//Option 1: Allow all Origins with Default of CORS(*)
app.use(cors());

//Option 2: Allow Custom Origins
// app.use(
//   cors(
//     {
//       origin: 'http://localhost:3000',
//       methods: [GET, POST, PUT, DELETE],
//       allowedHeaders: ['Content-Type']
//     }
//   )
// )

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send("MERN Bookstore Project in Progress...")
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
