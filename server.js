const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://Admin:123@cluster0.zogwti7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));
console.log("Database connected");


const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
