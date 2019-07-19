// STEP1: IMPORT MONGOOSE MODULE
var mongoose = require('mongoose');
// STEP2: CREATE SCHEMA OBJECT
const Schema = mongoose.Schema;

// STEP3: CREATE OUR SCHEMA WITH OPTIONALLY ADDING VALIDATIONS
let User = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    mobileNumber: {
        type: String
    },
    email: {
        type: String
        // default: 'Open'
    },
    password: {
        type: String
    }
});
// STEP4: EXPORT SCHEMA
module.exports = mongoose.model('User', User);