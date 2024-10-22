const Product = require('../models/productModel');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add new product (admin only)
exports.addProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
        const product = new Product({
            name,
            description,
            price,
            stock,
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
