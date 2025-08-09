import { builtinModules } from "module";
import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    busineesId: string;
    productName: string;
    productType: string;
    stock: number;
    price: number;
    billPrice: number;
}

const ProductSchema: Schema = new Schema({
    builtinModules  : { type: String, required: true },
    productName: { type: String, required: true },
    productType: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    billPrice: { type: Number, required: true }
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;