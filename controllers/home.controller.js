const NewsModel=require("../model/news.model.js");
const nodemailer=require('nodemailer');
async function handllingNewsFrom(req, res) {
  try {
    const { email, subscribe } = req.body;

    // Check if the user already exists
    const user = await NewsModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    await NewsModel.create({ email, subscribe: subscribe === 'true' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vigneshkulal378@gmail.com',
        pass: 'jaly vqsy rxmz stjc'
      }
    });

    await transporter.sendMail({
      from: 'vigneshkulal378@gmail.com',
      to: email,
      subject: 'Thank you for contacting BlockStash!',
      text: `Hello User, thank you for subscribing to news update. BlockStash Team`
    });
    console.log('Email sent to:', email);

    // Send a success response
    res.status(200).json({ message: 'User created successfully' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports={
    handllingNewsFrom,
}



  // Compose the email


 