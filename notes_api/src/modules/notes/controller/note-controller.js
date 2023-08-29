import { noteService } from "../services/note-service.js";
import {STATUS_CODES} from "../../../shared/utils/app-constants.js";
 const noteController = {
    async getAllNotes(request, response){
        try{
        const docs = await noteService.readAllNotes();
        response.status(STATUS_CODES.SUCCESS).json({'notes':docs});
        }
        catch(err){
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Problem in Fetching Notes'});
            console.log(err);
        }
    },
    async addNote(request, response){
        const noteBody = request.body;
        console.log('Data Rec by Controller ', noteBody);
        try{
        const doc = await noteService.addNote(noteBody);
        if(doc && doc.title){
            response.status(STATUS_CODES.SUCCESS).json({message:'Note Added SuccessFully'});
        }
        else{
            response.status(STATUS_CODES.RESOURCE_NOT_FOUND).json({message:'Not Able to Add a Note'});
        }
        }
        catch(err){
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Error in Adding Note'});
            console.log(err);
        }
    },
    async deleteNote(request, response){
        const title = request.query.title;
        try{
            const result = await noteService.deleteOneNote(title);
            response.status(STATUS_CODES.SUCCESS).json({message:`Deleted successfully  ${result}`});
        }
        catch(err){
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Error in deleting Note'});
            console.log(err);
        }
    },
    async updateNote(request, response){
        const id = request.query.id;
        const noteValue = request.body;
        try{
            const result = await noteService.updateOneNote(id,noteValue);
            response.status(STATUS_CODES.SUCCESS).json({message:`Updated successfully  ${result}`});
        }
        catch(err){
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Error in updating Note'});
            console.log(err);
        }
    }

    }
    
    export default noteController;
