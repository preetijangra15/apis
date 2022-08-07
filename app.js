const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const mongoose = require('mongoose');
const { json } = require('express');


app.use(express.urlencoded({extended: true}))
app.use(json)

const connectionParams = {
    useNewParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
}

const uri = "mongodb+srv://Preeti:pjankaktan@cluster0.sdq6q6f.mongodb.net/practice?retryWrites=true&w=majority"

const connexion = mongoose.connect(uri, connectionParams).then(()=>
    console.log('connectes to cloud atlas')
).catch((err)=> console.log(err))


const stud = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    course:{
        type: String,
        required: true
    }
})

const student = mongoose.model('student', stud);

app.post("/postdetails", (req, res)=>{
    console.log(req.body)
    const teststudent = new student({
        name : req.body.Name,
        course: req.body.Course
    })

    teststudent.save().then(doc => {
        console.log(doc);
    }).catch(err =>{
        console.log('error:', err)
    })

    console.log(student)
    res.send(student);
    console.log('detials posted');
})

app.get("/", (req, res) =>{
    console.log('working')
})

const port = 8081
app.listen(port, ()=>{
    console.log(`server is wroking on port ${port}`);
})
