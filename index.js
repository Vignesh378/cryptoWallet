const { error } = require('console');
const { subscribe } = require('diagnostics_channel');
const nodemailer = require('nodemailer');

const express=require('express');
const app=express();
const mongoose=require('mongoose');
const { type } = require('os');
const path=require('path');
const bip39=require('bip39'); 
const session = require('express-session');
const qrcode=require('qrcode')
const Seed=require('./model/seeds.model');
const Login=require('./routes/login');
const Wallet=require('./model/account.model')
// models
const handllingNewsFrom=require("./controllers/home.controller");
const {restrictedToLoggedIn}=require('./Middleware/auth')
//routes
const home=require('./routes/home');
const signup=require('./routes/signup');
const auth=require('./routes/auth');
const UserModel = require('./model/user.model');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crypto';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err)); 



// middleware
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//routes
app.use('/home',home);
app.use('/signup',signup);
app.use('/auth',auth);
app.use('/login',Login);
// Setup session
// app.use(session({
//   secret: 'blockstash-secret',
//   resave: false,
//   saveUninitialized: true
// }));

app.get('/Company',(req,res)=>{
  res.sendFile(path.join(__dirname,'public','Company.html'))
})
app.get('/', (req, res) => res.redirect('/dashboard'));
app.get('/dashboard',restrictedToLoggedIn,async(req,res)=>{
   try {
    // You need to get the user ID from session, JWT, or cookies
    const userId = req.user?._id; // or however you store user info
    console.log(userId);
    if (!userId) return res.redirect('/login');

    const user = await UserModel.findById(userId);
    console.log(user);
    if (!user || !user.wallets) return res.render('dashboard', { walletAddress: '', qrcode: '' });

    const wallet = await Wallet.findById(user.wallets);
    console.log(wallet)
    res.render('dashboard', {
      walletAddress: wallet ? wallet.address : '',
      qrCode: wallet ? wallet.qrcode : ''
    });
  } catch (error) {
    console.error(error);
    res.render('dashboard', { walletAddress: '', qrCode: '' });
  }
});
app.get('/discover', (req, res) => res.render('discover'));


app.get('/seed',(req,res)=>{
  const mnemonic = bip39.generateMnemonic(); // 12-word seed phrase
  const words = mnemonic.split(' ');
  res.render('seed',{mnemonic,words});
})

app.get('/save',(req,res)=>{
  
  res.render('save');
})

const SeedModel = require('./model/seeds.model'); // import this
const { Parser } = require('webpack');

app.post('/save-seed', async (req, res) => {
  try {
    const {email, seed } = req.body;
  

    if (!email) {
      return res.status(401).json({ message: 'Unauthorized: Email not found in session' });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newSeed = await Seed.create({ seed });
    user.seedDetails = newSeed._id;
    await user.save();

    res.status(200).json({redirect:'/save'});
  } catch (error) {
    console.error('Error saving seed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// ...existing code...

app.post('/contact', async (req, res) => {
  const { email, firstName, lastName, phone, message } = req.body;

  // Configure your email transporter (use your real credentials)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service
    auth: {
      user: 'vigneshkulal378@gmail.com',
      pass: 'qocn feqy cfbe uwul'
    }
  });

  // Compose the email
  const mailOptions = {
    from: 'vigneshkulal@gmail.com',
    to: email, // send to the user who submitted the form
    subject: 'Thank you for contacting BlockStash!',
    text: `Hello ${firstName || ''} ${lastName || ''},

Thank you for reaching out to BlockStash!
We have received your message:

"${message}"

We will get back to you soon.

Best regards,
BlockStash Team`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).redirect('/home/Company');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
