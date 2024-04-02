const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./connection');
const routes = require('./routes/authRoutes.js');
const category = require('./routes/categoryRoute.js');
const prodCreate = require('./routes/productRoutes.js');
const cors = require('cors');
const app = express();
const path = require('path');

//for configuration file 
dotenv.config();

//Database connection
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './client/dist')));

const port = process.env.PORT;

//routes
app.use('/api/v1/auth', routes);
app.use('/api/v1/category', category);
app.use('/api/v1/product', prodCreate);

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/dist/index.html'));
})


app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});