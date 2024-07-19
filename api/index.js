const express = require('express');
const app = express();
const {List, Task} = require('./db/models/index');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose'); // this would connect to db right away

const PORT = 3000;
    
  
// load middle ware 
app.use(bodyParser.json()); // necessary for using req.body
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, PATCH');
        return res.status(200).json({});
    };
    next();
});

 
// APIs  
// List Routes 

app.get('/test', (req, res) => {
    res.send('Test API working fine');
})
// returns all the lists from the data base
app.get('/lists', (req, res) => {
    List.find({}).then((lists)=>{  
        res.send(lists);
    })   
});

// create a new List
app.post('/lists', (req, res) => {
    // creates a new lists and returns that doc to user 
    const title = req.body.title;
    // res.send(title);
    const newList = new List({title});
    newList.save().then((listDocument)=>{
        res.send(listDocument);
    })
});


// update a specefied list
app.patch('/lists/:id', (req, res) => {
    // findOneAndUpdate({matching condition},{$set:req.body means set req.body as new value for this list})
    List.findOneAndUpdate({_id:req.params.id},{
        $set: req.body
    }).then(()=>{
        res.send({message: 'updated successfully'});
    })
})

// delete a specefied list
app.delete('/lists/:id', (req, res) => {
    List.findOneAndDelete({_id:req.params.id}).then((removedListDocument)=>{
        res.send(removedListDocument);
    });
})


// Task Routes 

// get all tasks of a particular list (list id)
app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({
        _listId:req.params.listId // return all the tasks whoose list id matches with specefied one
    }).then((tasks)=>{
        res.send(tasks);
    })
})

// adding a new task to a particular list (list id)
app.post('/lists/:listId/tasks', (req, res) => {

    // to add a task to particular list, set the _listId of task equal to specefied one
    const newTask = new Task({
       title:req.body.title,
       _listId:req.params.listId 
    });
    newTask.save().then((newTaskDocument) => {
        res.send(newTaskDocument);
    }); 

})

// updating data of a particular task (taskid) which is attached to a particlar list (_listId)
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    // update a task whoose _id and _listId matches
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    },{
        $set: req.body // updating its data with newly provided data
    }).then(()=>{
        res.send({message: 'Updated Successfully'});
    })
})

// delete a particular task from a particular list
app.delete('/lists/:listId/tasks/:tasksId', (req, res) => {
    Task.findOneAndDelete({
        _id: req.params.tasksId,
        _listId: req.params.listId
    }).then((deletedTaskDocument) => {
        res.send(deletedTaskDocument);
    })
})

app.get('/', (req, res) => {
    res.send('Server for Angular Task Management System');
})

app.listen(PORT, ()=>{
    console.log('PORT running on ' + PORT);
})