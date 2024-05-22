require('dotenv').config();
const mongoose = require('mongoose');

// Connection to MongoDB
mongoose.connect(process.env.dburl,)
  .then(() => console.log("Connection established successfully"))
  .catch((error) => console.error("Error connecting to the database:", error));

// Schema for user login
const loginSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String
});

// Schema for user registration
const registrationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: String,
  birthDate: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'prefer not to say']
  },
  address: {
    addressLine: String,
    city: String,
    region: String,
    postalCode: Number
  },
  serviceType: String,
  educationalQualification: String,
  experience: Number
});


const contactSchema = new mongoose.Schema({
  Name: {
      type: String,
      required: true
  },
  phoneNumber: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
  },
  Message: {
      type: String,
      required: true
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});

// Models based on the schemas
const Registration = mongoose.model('Registration', registrationSchema);
const LoginForm = mongoose.model('LoginForm', loginSchema);
const Contact = mongoose.model('Contact', contactSchema);

module.exports = { LoginForm, Registration  ,Contact};
