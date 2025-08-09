import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import Joi from "joi";

const productSchema = Joi.object({
    busineesId: Joi.number().optional(),
    productName: Joi.string().min(2).max(100).required(),
    productType: Joi.string().min(2).max(50).required(),    
    stock: Joi.number().integer().min(0).required(),
    price: Joi.number().min(0).required(),
    billPrice: Joi.number().min(0).required(),
});

const editProductSchema = Joi.object({
    productName: Joi.string().min(2).max(100).optional(),
    productType: Joi.string().min(2).max(50).optional(),    
    stock: Joi.number().integer().min(0).optional(),
    price: Joi.number().min(0).optional(),
    billPrice: Joi.number().min(0).optional(),
});

class ProductController {
    private productService = new ProductService();

    // Add new product
    async createProduct(req: Request, res: Response): Promise<void> {
        try {

            const { error } = productSchema.validate(req.body);
            if (error) {
                res.status(400).json({ message: error.details[0].message });
                return;
            }
            const { busineesId, productName, productType, stock, price, billPrice } = req.body;
            const product = await this.productService.saveProduct(busineesId, productName, productType, stock, price, billPrice);
            res.status(201).json({ message: "Product created successfully", product });
        } catch (err: any) {
            res.status(400).json({ message: err.message || "Server error" });
        }
    }

    // Edit product by ID
    async editProduct(req: Request, res: Response): Promise<void> {
        try {

             const { error } = editProductSchema.validate(req.body);
            if (error) {
                res.status(400).json({ message: error.details[0].message });
                return;
            }

            const { id } = req.params;
            const { productName, productType, stock, price, billPrice } = req.body;

            const updatedProduct = await this.productService.updateProduct(
                id,
                { productName, productType, stock, price, billPrice }
            );

            if (!updatedProduct) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
        } catch (err: any) {
            res.status(400).json({ message: err.message || "Server error" });
        }
    }

    // Get all products
    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const offset = parseInt(req.query.offset as string) || 0;
            const limit = parseInt(req.query.limit as string) || 10;
            const products = await this.productService.getAllProducts(offset, limit);
            res.status(200).json({ products });
        } catch (err: any) {
            res.status(500).json({ message: err.message || "Server error" });
        }
    }

}

export default ProductController;


