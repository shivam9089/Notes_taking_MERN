import NotesModel from '../models/note-schema.js';
export const noteService = {
    async addNote(noteObject){
        try{
        const doc = await NotesModel.create(noteObject);
        return doc;
        }
        catch(err){
            throw err;
        }
    },
    async readAllNotes(){
        try{
        const docs = await NotesModel.find({}).select("title descr cdate importance").exec();
        return docs;    
    }
        catch(err){
            throw err;
        }
    },
    async deleteOneNote(title){
        try {
            const result = await NotesModel.deleteOne({title:title})
            return result;
        } catch (err) {
            throw err;
        }
    },
    async updateOneNote(_id,noteObject){
        try {
            const result = await NotesModel.findByIdAndUpdate({_id},{ $set : noteObject },{new:true, useFindAndModify:false})
            return result;
        } catch (err) {
            throw err;
        }
    }
}