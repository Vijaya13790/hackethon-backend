import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    userType: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userType: { type: String, required: true, enum: ["seller", "buyer"], default: "seller" },
    password: { type: String, required: true }
});

export default mongoose.model<IUser>("User", UserSchema);
