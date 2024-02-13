const express = require('express');
const { requiredSignIn, adminController } = require('../middlewares/middleware');
const {
    createProductController,
    getProducts,
    getSingleProduct,
    getProductPhoto,
    deleteProduct,
    updateProductController,
    filterProduct,
    productCount,
    productList,
    searchProduct,
    similarProduct,
    catWiseProduct
} = require('../controller/productController');
const formidable = require('express-formidable');

const router = express.Router();

// create product
router.post('/create-product', requiredSignIn, adminController, formidable(), createProductController);

//update products
router.put('/update-products/:id', requiredSignIn, adminController, formidable(), updateProductController);

//Get products
router.get('/products', getProducts);

//Get Single Product
router.get('/get-product/:slug', getSingleProduct);

//Get Photo (Product)
router.get('/get-productphoto/:id', getProductPhoto);

//Delete Product
router.delete('/delete-product/:id', deleteProduct);

// filter product
router.post('/filter-product', filterProduct);

//product Count
router.get('/product-count', productCount);

//product per page
router.get('/product-list/:page', productList);

//search products
router.get('/search/:keyword', searchProduct);

//similar products
router.get('/similar-product/:pid/:cid', similarProduct);

// get categories wise products
router.get('/product-category/:slug', catWiseProduct);

module.exports = router;