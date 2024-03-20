const productModel = require('../models/product');
const categoryModel = require('../models/category');
const orderModel = require('../models/order');
const slugify = require('slugify');
const fs = require('fs');

module.exports = {

    //Create Products
    createProductController: async (req, res) => {
        try {
            const { name, description, price, category, quantity } = req.fields;
            const { photo } = req.files;

            if (!name || !description || !price || !category || !quantity) {
                return res.status(500).send({
                    success: false,
                    message: 'All fields are required'
                })
            } else if (photo && photo.size > 1000000) {
                return res.status(500).send({
                    success: false,
                    message: 'Photo is required and size is less than 1mb'
                });
            }

            const product = new productModel({ ...req.fields, slug: slugify(name) });
            if (photo) {
                product.photo.data = fs.readFileSync(photo.path);
                product.photo.contentType = photo.type;
            }
            await product.save();
            res.status(200).send({
                success: true,
                message: 'Product created successfully',
                product
            });

        } catch (err) {
            console.log(err)
            res.status(500).send({
                success: false,
                message: 'Error creating product'
            })
        }
    },

    //update product
    // updateProductController: async (req, res) => {
    //     try {
    //         const id = req.params.id;
    //         // console.log(id);
    //         console.log(req.fields);
    //         console.log(req.files);
    //     //     const { name, description, price, category, quantity } = req.fields || {};
    //     //     const { photo } = req.files;

    //     //     if (!name || !description || !price || !category || !quantity) {
    //     //         return res.status(500).send({
    //     //             success: false,
    //     //             message: 'All fields are required'
    //     //         });
    //     //     } else if (photo && photo.size > 1000000) {
    //     //         return res.status(500).send({
    //     //             success: false,
    //     //             message: 'Photo is required and size should be less than 1mb'
    //     //         });
    //     //     }

    //     //     // Extract category id from the object
    //     //     const categoryId = category._id || category;

    //     //     const updatedProduct = await productModel.findByIdAndUpdate(id, { ...req.fields, category: categoryId, slug: slugify(name) }, { new: true });


    //     //     if (photo) {
    //     //         updatedProduct.photo.data = fs.readFileSync(photo.path);
    //     //         updatedProduct.photo.contentType = photo.type;
    //     //         await updatedProduct.save();
    //     //     }

    //     //     res.status(200).send({
    //     //         success: true,
    //     //         message: 'Product updated successfully',
    //     //         updatedProduct
    //     //     });
    //     } catch (e) {
    //         console.log(e);
    //         res.status(500).send({
    //             success: false,
    //             message: 'Error updating product'
    //         });
    //     }
    // },

    updateProductController: async (req, res) => {
        try {
            const productId = req.params.id;
            const { name, description, price, category, quantity } = req.fields;
            const { photo } = req.files;

            if (!name || !description || !price || !category || !quantity) {
                return res.status(500).send({
                    success: false,
                    message: 'All fields are required'
                });
            } else if (photo && photo.size > 1000000) {
                return res.status(500).send({
                    success: false,
                    message: 'Photo is required and size is less than 1mb'
                });
            }

            const updatedFields = { name, description, price, category, quantity, slug: slugify(name) };

            if (photo) {
                updatedFields.photo = {
                    data: fs.readFileSync(photo.path),
                    contentType: photo.type
                };
            }

            const updatedProduct = await productModel.findByIdAndUpdate(productId, updatedFields, { new: true });

            if (!updatedProduct) {
                return res.status(404).send({
                    success: false,
                    message: 'Product not found'
                });
            }

            res.status(200).send({
                success: true,
                message: 'Product updated successfully',
                product: updatedProduct
            });

        } catch (err) {
            console.error(err);
            res.status(500).send({
                success: false,
                message: 'Error updating product'
            });
        }
    },

    //Get Products
    getProducts: async (req, res) => {
        try {
            //minus photo in product and set limit and get into sorted order
            const product = await productModel.find({}).populate('category').select('-photo').limit(10).sort({ createdAt: -1 });

            res.status(200).send({
                success: true,
                message: 'All products',
                product
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Error getting All products'
            });
        }
    },

    //Get single product
    getSingleProduct: async (req, res) => {
        try {
            const product = await productModel.findOne({ slug: req.params.slug }).select('-photo').populate('category');

            res.status(200).send({
                success: true,
                message: 'Product successfully fetched',
                product
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Error getting Single Product'
            })
        }
    },

    //Getting Single Product photo
    getProductPhoto: async (req, res) => {
        try {
            const productId = req.params.id;
            if (!productId) {
                return res.status(400).send({
                    success: false,
                    message: 'Product ID is missing'
                });
            }
            const product = await productModel.findById(productId).select('photo')
            if (!product || !product.photo || !product.photo.data) {
                return res.status(404).send({
                    success: false,
                    message: 'Product photo not found'
                });
            }

            res.set('Content-Type', product.photo.contentType);
            return res.status(200).send(product.photo.data);

        } catch (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Error getting product photo',
                err
            })
        }
    },

    //Delete  product
    deleteProduct: async (req, res) => {
        try {
            await productModel.findByIdAndDelete(req.params.id);
            res.status(200).send({
                success: true,
                message: 'Product deleted successfully'
            })
        } catch (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Error deleting product',
                err
            })
        }
    },

    //filter product
    filterProduct: async (req, res) => {
        try {
            const { checked, radio } = req.body;
            let args = {};
            if (checked.length > 0) args.category = checked;
            if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
            const products = await productModel.find(args);
            res.status(200).send({
                success: true,
                message: 'Product successfully filtered',
                products
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                success: false,
                message: 'Error filtering product',
            })
        }
    },

    //Product Count 
    productCount: async (req, res) => {
        try {
            const total = await productModel.find({}).estimatedDocumentCount();
            res.status(200).send({
                success: true,
                total
            })
        } catch (e) {
            console.log(e)
            res.status(400).send({
                success: false,
                message: 'Error product count'
            })
        }
    },

    //product Per Page
    productList: async (req, res) => {
        try {
            let perPage = 4;
            const page = req.params.page ? req.params.page : 1;
            const products = await productModel
                .find({})
                .select('-photo')
                .skip((page - 1) * perPage)
                .limit(perPage)
            // .sort({ createdAt: -1 });
            res.status(200).send({
                success: true,
                products
            })
        } catch (e) {
            res.status(404).send({
                success: false,
                message: 'Product list per page is not available'
            })
        }


    },

    //search products
    searchProduct: async (req, res) => {
        try {
            const { keyword } = req.params;
            const product = await productModel.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } }
                ]
            }).select('-photo');
            res.json(product);

        } catch (e) {
            console.log(e);
            res.status(404).send({
                success: false,
                message: 'Product is not available'
            })
        }
    },

    //similar products
    similarProduct: async (req, res) => {
        try {
            const { pid, cid } = req.params;

            const product = await productModel.find({
                category: cid,
                _id: { $ne: pid } //ne = not encluded in product
            })
                .select('-photo')
                .limit(3)
                .populate('category');

            res.status(200).send({
                success: true,
                product
            })
        } catch (error) {
            console.log(error);
            res.status(400).send({
                success: false,
                message: 'Error while getting similar products'
            })
        }
    },

    //category wise product
    catWiseProduct: async (req, res) => {
        try {
            const category = await categoryModel.findOne({ slug: req.params.slug });
            const products = await productModel.find({ category }).populate('category');
            res.status(200).send({
                success: true,
                products,
                category
            })
        } catch (error) {
            console.log(error);
            res.status(400).send({
                success: false,
                message: 'Error while geting category wise product'
            })
        }
    },

    //order sent by user
    ordersByUser: async (req, res) => {
        try {
            const { shoppingCart, name, email, address, number } = req.body;
            const order = new orderModel({
                name: name,
                email: email,
                address: address,
                products: shoppingCart,
                buyer: req.user._id,
                contactNumber: number
            }).save()
            res.json({ ok: true })
        } catch (error) {
            console.log(error);
            res.status(400).send({
                success: false,
                message: 'Error While User Order'
            })
        }
    },

    //Delete product by user
    productDeleteInOrder: async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const productId = req.params.productId;

            // find order
            const order = await orderModel.findById(orderId);
            if (!order) {
                return res.status(404).send({
                    success: false,
                    message: 'Order not found'
                })
            }

            // find product index
            const productIndex = order.products.findIndex(product => product._id === productId);
            if (productIndex === -1) {
                return res.status(404).send({ message: 'Product not found in the order' });
            }

            order.products.splice(productIndex, 1);
            await order.save();

            return res.status(200).send({
                success: true,
                message: 'Product deleted Successfully from order'
            });

        } catch (error) {
            console.log(error);
            res.status(404).send({
                success: false,
                message: 'Error while deleting Product'
            })
        }
    },

    //get order
    getOrder: async (req, res) => {
        try {
            const order = await orderModel.find({}).limit(10).sort({ createdAt: -1 });
            if (order) {
                res.status(200).send({
                    success: true,
                    message: 'Order was successfully get',
                    order
                })
            }
        } catch (e) {
            console.log(e);
            res.status(404).send({
                message: 'Error while getting order',
                success: false
            })
        }
    },

    //find products based on order ID
    getProductsbyOrderId: async (req, res) => {
        try {
            const orderId = req.params.orderId;

            const order = await orderModel.findById({ _id: orderId });
            if (order) {

                const products = order.products;
                return res.status(200).send({
                    success: true,
                    message: 'Order found',
                    products,
                })
            }
            else {
                return res.status(404).send({
                    success: false,
                    message: 'Order Not found',
                })
            }
        } catch (error) {
            console.log(error);
            res.status(404).send({
                success: false,
                message: 'Error while getting products based on order ID'
            })
        }
    },

    //order status update
    orderStatusUpdate: async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const status = req.body.status;

            const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
            if (!orders) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }
            res.json(orders);

        } catch (error) {
            res.status(404).send({
                success: false,
                message: 'Error while updating order status',
                error
            })
        }
    },

    //Allow user to edit order
    orderAllowEdit: async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const allowedStatus = req.body.allowedStatus;

            const orders = await orderModel.findByIdAndUpdate(orderId, { allowEdit: allowedStatus }, { new: true });

            if (!orders) {
                return res.status(404).send({
                    success: false,
                    message: 'Order not found'
                })
            }

            res.json(orders);

        } catch (error) {
            console.log(error);
            res.status(404).send({
                success: false,
                message: 'Error while Allow order edit',
            })
        }
    }
}

