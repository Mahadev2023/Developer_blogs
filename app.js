
const express=require('express');

require('dotenv').config();

const cors = require('cors')
const signupLoginRoute=require('./route/signupLogin');

const currentUserRoute=require('./route/users');

const  blogRoute=require('./route/blogs');

const ratingRoute=require('./route/ratings');
const commentRoute=require('./route/comments');

const port=3000;
const app=express();

app.use(cors())


app.use(express.json());



app.use('/',signupLoginRoute);


app.use('/blogs',blogRoute);

app.use('/user',currentUserRoute);

app.use('/rating',ratingRoute);

app.use('/comment',commentRoute);

app.use((req,res,next)=>{
    res.status(404).json("ROUTE NOT FOUND");
})

app.use((error,req,res,next)=>{
    console.log(error);
    const status=error.statusCode || 500;
    const message=error.message;
    res.status(status).json({message:message})
})


app.listen(port,()=>{
    console.log("server is running on"+port);
})

















// console.log(sequelize.tblog);


// async function fun(){
//     const data=await sequelize.tblog.users.findAll();
//     console.log(JSON.stringify(data));
// }

// fun();