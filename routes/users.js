const router= require('express').Router()
const UserModel =require('../models/Users')
const auth = require('../middleware/auth')

router.get('/',auth,async(req,res)=>{

    const users = await  UserModel.aggregate()
    .project({
        "_id":0,
        "__v":0
    })
    res.send(users)
})

router.post('/submit',async(req,res)=>{
   try{
  const call = await  UserModel.create(req.body)
    res.send({response:call})
   }
   catch(e){
       res.send(e)
   }
})

module.exports=router