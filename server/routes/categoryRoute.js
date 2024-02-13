const express = require('express');
const { requiredSignIn, adminController } = require('../middlewares/middleware');
const {categoryController, updateCategoryController, categories, singleCategoryController, deleteCategoryController, deleteAllCategoriesController} = require('../controller/categoryController');

const router = express.Router();

//create category controller
router.post('/create-category', requiredSignIn, adminController, categoryController);

//update category 
router.put('/update-category/:id', requiredSignIn, adminController, updateCategoryController);

//get all categories
router.get('/categories', categories )

//get single category
router.get('/single-category/:slug', singleCategoryController );

//delete category
router.delete('/delete-category/:id', deleteCategoryController )

//delete All categories
router.delete('/delete-all-categories', deleteAllCategoriesController )

module.exports = router
