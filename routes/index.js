const express = require('express');
const router = express.Router();
const { LoginForm, Registration,Contact } = require('./database');
// const multer = require('multer');
// const path = require('path');

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'C:/Users/mohit/Desktop/profilepicture');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });
// // Function to check file extension
// function isValidFileType(file) {
//   const allowedExtensions = ['.jpg', '.jpeg', '.png'];

//   if (!file || !file.originalname) {
//     console.log('File or file name is missing');
//     return false; // Return false if file or file name is missing
//   }

//   const fileExtension = path.extname(file.originalname).toLowerCase();
//   console.log('File extension:', fileExtension);

//   const isValid = allowedExtensions.includes(fileExtension);
//   console.log('Is valid extension?', isValid);

//   return isValid;
// }


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index2', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/contact', function(req, res, next) {
  res.render('contact' );
});
router.get('/service', function (req, res, next) {
  // Render the 'service' EJS template when '/service' is requested
  res.render('service');
});

router.get('/index2', function(req, res, next) {
  res.render('index' );
});
router.get('/serviceProvider', function(req, res, next) {
  res.render('serviceProvider' );
});
router.get('/serviceProvider2', function(req, res, next) {
  res.render('serviceProvider2' );
});
router.get('/Sucess', function(req, res, next) {
  res.render('Sucees');
});

//all services routers are here ***


router.get('/Mechanical', async function (req, res, next) {
  // Render the 'service' EJS template when '/service' is requested
  // console.log( Registration.findOne({ serviceType: 'Mechanic' }));
  // res.send( <div><h1>Ahsish</h1></div>);
  const mechanicalData = await Registration.find({ serviceType: 'Mechanic' });
  res.render('Mechanical', { data: mechanicalData});
});
router.get('/Electrical', async function (req, res, next) {
  const mechanicalData = await Registration.find({ serviceType: 'Electrician' });
  res.render('Electrical', { data: mechanicalData});
});
router.get('/Plumber', async function (req, res, next) {
  const mechanicalData = await Registration.find({ serviceType: 'Plumber' });
  res.render('Plumber', { data: mechanicalData});
});
router.get('/HomeTutor', async function (req, res, next) {
  const mechanicalData = await Registration.find({ serviceType: 'Home tutor' });
  res.render('HomeTutor', { data: mechanicalData});
});
router.get('/DanceTutor', async function (req, res, next) {
  const mechanicalData = await Registration.find({ serviceType: 'Dance tutor' });
  res.render('DanceTutor', { data: mechanicalData});
});
router.get('/Caregiver', async function (req, res, next) {
  const mechanicalData = await Registration.find({ serviceType: 'Caregiver' });
  res.render('Caregiver', { data: mechanicalData});
});
router.get('/Gardener', async function (req, res, next) {
  const mechanicalData = await Registration.find({ serviceType: 'Gardener' });
  res.render('Gardener', { data: mechanicalData});
});
router.get('/Chef', async function (req, res, next) {
  const mechanicalData = await Registration.find({ serviceType: 'Chef' });
  res.render('Chef', { data: mechanicalData});
});
router.get('/Cleaner', async function (req, res, next) {
  const mechanicalData = await Registration.find({ serviceType: 'Cleaner' });
  res.render('Cleaner', { data: mechanicalData});
});
router.get('/Grooming', async function (req, res, next) {
  const mechanicalData = await Registration.find({ serviceType: 'Grooming' });
  res.render('Grooming', { data: mechanicalData});
});





router.get('/contactdb', function(req, res) {
  res.render('Contactdb' );
});



// router.post('/Mechanical', async (req, res) => {
//   try{
//     const data = Registration.findOne()
//   }
// }


router.post('/submitForm', async (req, res) => {

  try {
    console.log('###');
    console.log(req.body);
    const newLoginForm = new LoginForm({
      fullName: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
    });

    await newLoginForm.save();

    console.log(LoginForm.findOne({ email: 'a@aa.com' }));

    res.status(200).render("index");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving form data.');
  }
});
router.post('/Register', async (req, res) => {
  try {
    console.log((req.headers))
    const {
      fullName,
      email,
      phoneNumber,
      birthDate,
      gender,
      addressLine,
      city,
      region,
      postalCode,
      serviceType,
      educationalQualification,
      experience,
    } = req.body;
    console.log('###');
    const newRegistration = new Registration({
      fullName,
      email,
      phoneNumber,
      birthDate,
      gender,
      address: {
        addressLine, // Utilize the individual fields from the request body
        city,
        region,
        postalCode,
      },
      serviceType,
      educationalQualification,
      experience,
    });
    await newRegistration.save();
    console.log(await Registration.findOne({ serviceType: 'Mechanic' }));
    res.status(200).render("Confrim");
    // res.status(200).send('nZBCSKMHBC');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving form data.');
  }
});
router.post('/Login', async (req, res) =>{
  try{
    // console.log(req.body);
    const email=req.body.email;
    const password=req.body.password;

    const user = await LoginForm.findOne({email:email});
    if(!user)
      res.status(400).send('user not fount');
    if(user.password !== password)
    res.status(200).render("Invaid")
    
    res.status(200).render("index")

  }catch(err){
    res.status(500).send('Error saving form data.');
  }
})


router.post('/Contactdb', async (req, res) => {
  try {
      // Extract form data from request body
      const { Name, phoneNumber, email, Message } = req.body;

      // Create a new Contact instance
      const newContact = new Contact({
          Name,
          phoneNumber,
          email,
          Message
      });

      // Save the contact details to the database
      const savedContact = await newContact.save();
      console.log(savedContact);

      // Send a success response
      res.status(200).render("Confrim");
  } catch (err) {
      // Handle any errors that occur during the process
      res.status(500).json({ message: 'An error occurred while saving contact details', error: err.message });
  }
});


module.exports = router;
