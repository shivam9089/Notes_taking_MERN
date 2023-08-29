import { userService } from "../services/user-services.js";
import { STATUS_CODES } from "../../../shared/utils/app-constants.js";
import bcrypt from 'bcrypt';
const userController = {
    async addUser(request, response){
        
        const userBody = request.body;
         
        try{
        const doc = await userService.addUser(userBody);
        
        if(doc && doc.email){
            
            response.status(STATUS_CODES.SUCCESS).json({message:'User Added SuccessFully'});
        }
        else{
            response.status(STATUS_CODES.RESOURCE_NOT_FOUND).json({message:'Not Able to Add a User'});
        }
        }
        catch(err){
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Error in Adding User'});
            console.log(err);
        }
    },
    async getUser(request, response){
        try{
        const email = request.query.email;    
        const docs = await userService.readUser(email);
        response.status(STATUS_CODES.SUCCESS).json({'user':docs});
        }
        catch(err){
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Problem in Fetching User'});
            console.log(err);
        }
    },
    async updatePwd(request, response){
        const email = request.query.email;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(request.body.password, salt);
        
        try{
            const result = await userService.updateOnePwd(email,password);
            response.status(STATUS_CODES.SUCCESS).json({message:`Updated successfully  ${result}`});
        }
        catch(err){
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Error in updating password'});
            console.log(err);
        }
    },
    async deleteUser(request, response){
        const email = request.query.email;
        try{
            const result = await userService.deleteOneUser(email);
            response.status(STATUS_CODES.SUCCESS).json({message:`Deleted successfully  ${result}`});
        }
        catch(err){
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Error in deleting User'});
            console.log(err);
        }
    },
}
export default userController;