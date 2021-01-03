const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String },
  created: {
    type: Date,
    default: Date.now,
  },
  tokens: [{
    token: {
        type: String,
        required: true
    }
}]
});

AdminSchema.pre("save", async function (next)  {
  // hashing the password before saving
  const admin = this;
  if (admin.isModified("password")) {
    console.log('step 1.1')
    admin.password = await bcrypt.hash(admin.password, 10);
  }

  next();
});

AdminSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const admin = this
    const token = jwt.sign({_id: admin._id}, process.env.JWT_TOKEN)
    admin.tokens = admin.tokens.concat({token})
    await admin.save()
    return token
}

AdminSchema.statics.findByCredentials= async(email,password)=>{
    const admin = await Admin.findOne({email})
    if(!admin){
            throw new Error({error:"Invalid Credentials"})
    }
    const isPasswordMatch= await bcrypt.compare(password,admin.password)
    if(!isPasswordMatch){
    throw new Error({error:"Invalid Credentials"})
    }
    return admin
}

const Admin= mongoose.model("admin", AdminSchema)

module.exports=Admin