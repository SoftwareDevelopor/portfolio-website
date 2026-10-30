const ContactModal = require("../Modal/ContactModal");
require("dotenv").config();
const nodemailer = require("nodemailer");

exports.createcontact = async (request, response) => {
  try {
    // 1. Check if contact already exists (with return to halt execution)
    let existingcontact = await ContactModal.findOne({
      name: request.body.name,
      email: request.body.email
    });

    if (existingcontact) {
      return response.send({
        status: false,
        msg: "You have already contacted us..!",
        _data: null
      });
    }

    // 2. Save data to MongoDB
    const contactData = request.body;
    const newContact = await ContactModal(contactData);
    await newContact.save().then(async (result) => {

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.Email,
          pass: process.env.PASSWORD
        },
        host: "smtp.gmail.com",
        secure: false
      });

      var mailoptions = {
        from: `"Contact Form Enquiry" <${result.email}>`,
        to: process.env.Email,
        subject: "New Contact Us Enquiry.",
        html: `
        <div style="background-color: #f9f9f9; padding: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #333; font-size: 20px;">Received message from ${result.name} (${result.email})</h1>
          <p style="color: #666; font-size: 18px;">${result.message}</p>
        </div>
      `
      };

      await new Promise((resolve, reject) => {
        transporter.sendMail(mailoptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
            const obj = {
              status: true,
              msg: "Thanking you for contacting to us...!",
              _data: result
            }
            return response.send(obj)
          }
        });
      });
    })

  } catch (error) {
    console.error("Contact Form Error:", error);
    return response.send({
      status: false,
      msg: "Failed to process the contact us enquiry...!",
      _data: null,
      errormsg: error.message
    });
  }
};