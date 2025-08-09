import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";

export default class UserService {
    async registerUser(name: string, email: string, userType: string, password: string): Promise<IUser> {
        
        const existingUser = await User.findOne({ email, userType });
        if (existingUser) {
            throw new Error("A user with this userType already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser: IUser = new User({ name, email, userType, password: hashedPassword });
        await newUser.save();
        return newUser;
    }
}