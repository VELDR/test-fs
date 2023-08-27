require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');

//middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use('/api/user', userRoute);
app.use('/api/product', productRoute);

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to database\nListening to port', process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
