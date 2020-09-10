const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// creating the schema for the mongoDB database
let Todos = new Schema({
    todo_description:{
        type: String
    },
    todo_responsible:{
        type: String
    },
    todo_priority:{
        type: String
    },
    todo_complete: {
        type: Boolean
    },
    todo_creation_date:{
        type: String
    },
    todo_mod_date:{
        type:String
    }
})


// creating and exporting the model as Todo from Todos schema
module.exports = mongoose.model('Todo', Todos);