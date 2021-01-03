const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required:true },
  contactNumber: String,
  ssn: {type:String, unique:true},
  address: String,
});

const UserModel = mongoose.model("users", schema);

module.exports = UserModel;
