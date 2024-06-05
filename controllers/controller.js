const RegModel=require('../models/reg.model')
const bcrypt=require('bcrypt')
const Product=require('../models/products')
const jwt=require('jsonwebtoken')
const Query=require('../models/Query.model')
const nodemailer = require('nodemailer');

exports.Home= async(req,res)=>{
    const FindRecord= await RegModel.find()
   res.json(FindRecord)
}

exports.Register=async(req,res)=>{
   
    const {name,email,number,password}=req.body
    const hashedPassword = await bcrypt.hash(password, 10);
     
    const userCheack=await RegModel.findOne({email:email})
   
    if(userCheack==null){
     
   const record=  await new RegModel({
        name:name,
        email:email,
        number:number,
        password:hashedPassword
     })
     record.save()
     res.json({
        statusCode:202,
        message:"Register SuccessFully",
        data:record
    })
}
else{
    res.json({
        statusCode:404,
        message:"User Allready Existes",
        data:null
    })
}
}


exports.Login = async(req,res)=>{
  const {email,password}=req.body

 const loginRecord= await RegModel.findOne({email:email})
 
 if(loginRecord!==null){
    const mathcedPassword=await bcrypt.compare(password,loginRecord.password)
    if(mathcedPassword){
    const jwtToken =jwt.sign({userId:loginRecord._id},"secret_key" ,{
        expiresIn:"2m",
    })

    res.json({
        message:"successfully login",
        statusCode:202,
        data:loginRecord,
        jwtToken,
        userId:loginRecord._id
    })
  


}else{
    res.json({
        message:"password not matched",
        statusCode:404,
        data:loginRecord
    })
}
 }
 else{
    res.json({
        message:"Email Not Registerd",
        statusCode:404,
        data:loginRecord
    })
 }
//  console.log(loginRecord)
}


exports.DeleteUser= async(req,res)=>{
    const id=req.params.id
  const record=  await RegModel.findByIdAndDelete(id)
  res.json(record)
}


exports.UpdateUser = async(req,res)=>{
   const {name,email,number}= req.body
    const id = req.params.id 
   const record= await RegModel.findByIdAndUpdate(id,{
        name:name,email:email,number:number
    })

    res.json(record)
}


exports.addproduct = async(req,res)=>{

    try{
    const img=req.file.filename
    const {titel,desc,price}=req.body
    
  const productRecord =await new Product({
    pimg:img,
    titel:titel,
    desc:desc,
    price:price
   })

  await productRecord.save()
  console.log(productRecord)
   res.json({
    message:"Product Addded",
    statusCode:202,
    data:productRecord
   })
} 
catch(error){
    res.json({
        message:"error in product Api",
        statusCode:404,
        data:null
       })
}


}




exports.getproducts = async(req,res)=>{
    try{
   const ProductRecord= await Product.find()
   res.json({
    message:"Product Finded Successfully",
    statusCode:202,
    data:ProductRecord
   })
}
catch(error){
    res.json({
        message:"Error In get Product Api",
        statusCode:404,
        data:error
       })
}

}

exports.idsprodects= async(req,res)=>{
    // console.log(req.body.ids)
   const ids= req.body.ids
  const record= await Product.find({_id:{$in:ids}})
  res.json(record)
}



exports.query=async(req,res)=>{
    const {name,email,query}=req.body
  const queryRecord=  await new Query({
        name:name,
        email:email,
        query:query,
        status:"Unread"
    })

    await queryRecord.save()
    console.log(queryRecord)
    res.json({
         message:"Your qury is got it you receive reply early",
         data:queryRecord,
         statusCode:202
    })
    


}

exports.findQuery =async(req,res)=>{
   const findRecord= await Query.find()
   res.json(findRecord)
}


exports.QuryreplyFind = async(req,res)=>{
    const id=req.params.id
    const record=await Query.findById(id)
    
    // console.log(record)
    res.json(record)
}

exports.QueryReply = async(req,res)=>{
    const id=req.params.QueryId
    const {UserEmail,Concern,Reply}=req.body

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Replace with your SMTP server
        port: 587, // Replace with your SMTP port
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'thevirus991@gmail.com', // Replace with your email
            pass: 'hkcr wtsh kxqa glmk', // Replace with your email password
        },
    });


    let mailOptions = {
        from: '"kp delevelopers" thevirus991@gmail.com', // Replace with your email
        to: UserEmail, // List of receivers
        subject: "Reply:"+Concern, // Subject line
        text: Reply, // Plain text body
        // html: '<b>Hello world?</b>' // HTML body (optional)
    };
    await transporter.sendMail(mailOptions)
   
    const statusReocrd=await Query.findByIdAndUpdate(id,{status:"read"})
    
    res.json(statusReocrd)

     
}

exports.deleteQuery = async(req,res)=>{
    const id=req.params.id
    const deleterecord= await Query.findByIdAndDelete(id)
    res.json(deleterecord)
}
