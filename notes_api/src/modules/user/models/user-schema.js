import mongoose, { SchemaTypes } from 'mongoose';
import validator from 'validator';
import bcrypt from "bcrypt";
import { AppConstants } from '../../../shared/utils/app-constants.js';
const schemaNa = AppConstants.SCHEMA.USER_SCHEMA;
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email:{type:SchemaTypes.String, required:[true, ' Email is required '], unique:true, validate: [ validator.isEmail, 'invalid email' ]},
    password:{type:SchemaTypes.String, minlength:8, maxlength:25},
    name:{type:SchemaTypes.String, minlength:3, maxlength:25, validate: [ validator.isAlpha, 'name should alphabet only ']},
    phone:{type:SchemaTypes.String, minlength:10, maxlength:10, validate: [ validator.isNumeric, 'number should numeric only ']}
    
});



const SALT_WORK_FACTOR = 10; 
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const UserModel = mongoose.model(schemaNa, UserSchema);
export default UserModel;