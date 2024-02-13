const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./connection');
const routes = require('./routes/authRoutes.js');
const category = require('./routes/categoryRoute.js');
const prodCreate = require('./routes/productRoutes.js');
const cors = require('cors');
const app = express();

//for configuration file 
dotenv.config();

//Database connection
connectDB();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

//routes
app.use('/api/v1/auth', routes);
app.use('/api/v1/category', category);
app.use('/api/v1/product', prodCreate);

app.get('/', (req, res) => {
    res.send("<h1>E-commerce Project</h1>");
})

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});