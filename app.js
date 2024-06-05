const express=require('express') // module
const app=express()
const ApiRouter=require('./routers/routes')

const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/11AmMern').then(()=>{
    console.log("data-base is coonected")
}).catch((error)=>{
    console.log("error in data-base",error)
})



app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(express.static('./public/upload'))
app.use(ApiRouter)
app.listen(5002,()=>{
    console.log("server is running on 5002")
})
