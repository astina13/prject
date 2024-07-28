const express = require('express');
const router = express.Router();
const Product = require('models/product.js');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// Add a new product
router.post('/', async (req, res) => {
    const { title, author, genre, description, price, image } = req.body;

    try {
        const product = new Product({ title, author, genre, description, price, image });
        await product.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
});

module.exports = router;
