import UserModel from "../models/user-schema.js";
export const userService = {
    async addUser(userObject){
        
        try{
            
        const doc = await UserModel.create(userObject);
        return doc;
        }
        catch(err){
            throw err;
        }
    },
    async readUser(email){
        try{
        const docs = await UserModel.find({email:email}).select().exec();
        return docs;    
    }
        catch(err){
            throw err;
        }
    },
    async updateOnePwd(email,password){
        try {
            
            const result = await UserModel.findOneAndUpdate({email:email},{ password : password },{new:true, useFindAndModify:false})
            return result;
        } catch (err) {
            throw err;
        }
    },
    async deleteOneUser(email){
        try {
            const result = await UserModel.deleteOne({email:email})
            return result;
        } catch (err) {
            throw err;
        }
    },
}