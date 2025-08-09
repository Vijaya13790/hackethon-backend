import Product, { IProduct } from "../models/Product";

export default class ProductService {
    async getAllProducts(offset: number, limit: number): Promise<IProduct[]> {
        return Product.find().skip(offset).limit(limit);
    }
    async updateProduct(id: string, data: any): Promise <IProduct | null> {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    return product; // returns the updated product or null
}
    async saveProduct(busineesId : number ,productName: string, productType: string, stock: number, price: number, billPrice: number): Promise<IProduct> {
        // Check if a product with the same name and type already exists
        const existingProduct = await Product.findOne({ productName, productType });
        if (existingProduct) {
            throw new Error("A product with this name and type already exists");
        }

        const newProduct: IProduct = new Product({ productName, productType, stock, price, billPrice });
        await newProduct.save();
        return newProduct;
    }
}