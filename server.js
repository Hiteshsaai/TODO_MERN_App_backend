const express  = require("express");
const bodyParser  = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./todo-module");

const app = express();

const todoRouter = express.Router();

const PORT = 4000;


app.use(cors());
app.use(bodyParser.json());


// connecting to mongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true , useUnifiedTopology: true});

const connection = mongoose.connection;

// To check if it has connected successfully to the mongoDB database
connection.once('open', () => console.log("MongoDB Database connection is establised Successfully"))


//User Endpoint creation

// To get all the Todo
todoRouter.route('/').get((req, res) => {
    Todo.find((err, todos) => {
        if (err){
            console.log(err);
        }
        else{
            res.json(todos);
        }
    })
}
)

// GET Specific Todo by ID
todoRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    Todo.findById(id, (err, todo) => {
        res.json(todo);
    });
})

// add a new user using POST request
todoRouter.route('/add').post((req, res) => {
    const todo = new Todo(req.body);

    todo.save()
    .then(todo => {
        res.status(200).json({'todo':'Todo Added Successfully'})
    })
    .catch(err => {
        res.status(400).send("Failed to add the Todo to the List");
    })

});


// todoRouter.route('/update/:id').post((req, res) =>{
//     Todo.findById(req.params.id, (err, todo) =>{
//         if(!todo)
//             res.status(404).send("Requested data not found");
//         else
//             todo.todo_description = req.body.todo_description;
//             todo.todo_responsible = req.body.todo_responsible;
//             todo.todo_priority = req.body.todo_priority;
//             todo.todo_complete = req.body.todo_complete;
//             todo.todo_creation_date = req.body.todo_creation_date;    

//             todo.save().then(todo => {
//                 res.jsion(`Todo with ID: ${req.params.id} got updated`)
//             })
//             .catch(err => {
//                 res.status(400).status("Update not possible");
//             });
//     });

// });


// todoRouter.route('/update/:id').post((req, res) => {
//     Todo.findById(req.params.id, (err, todo) => {
//         if (!todo)
//             res.status(404).send('data is not found');
//         else
//             todo.todo_description = req.body.todo_description;
//             todo.todo_responsible = req.body.todo_responsible;
//             todo.todo_priority = req.body.todo_priority;
//             todo.todo_completed = req.body.todo_completed;

//             todo.save().then(todo => {
//                 res.json(`Todo with ID: ${req.params.id} got updated`);
//             })
//             .catch(err => {
//                 res.status(400).send("Update not possible");
//             });
//     });
// });


// Update a exisiting user using POST request 
todoRouter.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_complete = req.body.todo_complete;
            todo.todo_mod_date = req.body.todo_mod_date;

            todo.save().then(todo => {
                res.json('todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});



// Delete todo using DELETE Method
todoRouter.route("/delete/:id").delete((req, res) => {
    const id = req.params.id
    Todo.remove({_id: id}, (err, todo)=> {
        res.json(`This todo assinged to ID: ${id} is deleted successfully!`)
    })

})


app.use('/todos', todoRouter);

app.listen(PORT, () => console.log(`The Server is running on port: localhost:${PORT}`))