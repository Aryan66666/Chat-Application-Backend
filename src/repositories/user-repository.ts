import { userSignup } from "../interfaces/user-interface";
import User from "../models/userModel";
import { AppError } from "../utils/error";
import logger from "../utils/logger";

export class UserRepository{
    public createUser = async(user:userSignup) => {
        const userData = new User({
            username: user.username,
            email: user.email,
            password: user.password,
            profilePhoto: user.profilePhoto,
            lastSeen: user.lastSeen,
            isOnline: user.isOnline,
            isVerified: user.isVerified
        });
        try{
            await userData.save();
        }
        catch(error){
            logger.error("Error: ",error)
            throw new AppError("Error Adding User to DB", 500)
        }



        
    }
    public updateUserVerificationStatus = async(username:string, status:boolean) => {






    }

    public getUserIdByUsername = async(username: string) => {

    }
}