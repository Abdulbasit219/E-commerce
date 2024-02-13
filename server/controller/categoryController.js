const categoryModel = require('../models/category');
const slugify = require('slugify');

module.exports = {
    //crete category
    categoryController: async (req, res) => {
    try{
        
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message: "name is required"});
        }

        const UpperCaseName = name.toUpperCase();
        const slug = slugify(UpperCaseName, { lower: true });

        const existingCategory = await categoryModel.findOne({name: UpperCaseName});
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message:'Category already exists'
            });
        }

        const category = await new categoryModel({name: UpperCaseName, slug }).save();
        res.status(200).send({
            success: true,
            message: 'new category created',
            category
        })

        }catch(err){
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Error in Category'
            });
        }
    },

    //update category
    updateCategoryController: async (req, res) => {
        try{
            const {name} = req.body;
            const {id} = req.params;
            const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true});
            res.status(200).send({
                success: true,
                message: 'Category updated successfully',
                category
            })
        }catch(err){
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Error in Update-Category'
            })
        }
    },

    //get All categories
    categories: async (req, res) => {
        try{
            const category = await categoryModel.find({});
            res.status(200).send({
                success: true,
                message: 'All Categories',
                category
            })
        }catch(err){
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Error in Get-Category'
            })
        }
    },

    //get single category
    singleCategoryController: async (req,res) => {
        try{
            const {slug} = req.params;
            const category = await categoryModel.findOne({slug});
            if(!category){
                return res.status(404).send({
                    success: false,
                    message: 'Category not found'
                })
            }
            return res.status(200).send({
                success: true,
                message: 'Category found successfully',
                category
            })
        }catch(err){
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Error in Single Get-Category'
            })
        }
    },

    //delete single category
    deleteCategoryController: async (req, res) => {
        try{
            const {id} = req.params;
            const deleteCategory = await categoryModel.findByIdAndDelete(id);
            if(deleteCategory){
                res.status(200).send({
                    success: true,
                    message: 'Category deleted successfully',
                    deleteCategory
                })
            }
        }catch(err){
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Error in Delete-Category'
            })
        }
    },

    //Delete all categories
    deleteAllCategoriesController: async (req,res) => {
        try{
            const deleteCategories = await categoryModel.deleteMany({});
            if(deleteCategories.length > 0){
                res.status(200).send({
                    success: true,
                    message: 'All categories are deleted successfully',
                    deleteCategories
                })
            }
        }catch(err){
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Error in Delete-All-Categories'
            })
        }
    }
    
}