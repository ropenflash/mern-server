const router= require('express').Router()
const Admin =require('../models/Admin')
const auth = require('../middleware/auth')

router.post('/signup',async(req,res)=>{
    console.log('req body',req.body)
    try {
        const admin = new Admin(req.body)
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
    } catch (error) {
        res.status(400).send(error)
    }
    
})

router.post('/login',async(req,res)=>{
    try{
        const {email, password}= req.body
        const admin= await Admin.findByCredentials(email,password)
        if (!admin) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await admin.generateAuthToken()
        res.send({ token })
    }
    catch(err){
        res.status(400).send(err)
    }

})

router.get('/logout',auth,async(req,res)=>{
    // Log user out of the application
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.admin.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports=router