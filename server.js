const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model');
const cors = require('cors');
const app = express();

app.use(express.json()); // ✅ Middleware to parse JSON data
app.use(cors({
    origin: '*'
})); // ✅ Allow frontend requests (if applicable)

mongoose.connect('mongodb://localhost:27017/todoapp').then( () => {
    console.log('mongodb connection setup completed');
});

app.post('/addtask', async(req, res) => {
    const {todo} = req.body;

    try{
      const newData = new TaskSchema({
        todo: todo
      })  
      await newData.save();
      return res.json(await TaskSchema.find());
    } 
    catch (err){
       console.log(err);
    }
})

app.get('/gettask', async(req, res) => {
    try{
       return res.json(await TaskSchema.find()); 
    } 
    catch (err) {
        console.log(err); 
    }
})

app.delete('/delete/:id', async(req, res) => {
    try {
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find());
    } 
    catch (err) {
       console.log(err);
        
    }
})


app.listen(5000, () => {
    console.log("server running...");
    
})