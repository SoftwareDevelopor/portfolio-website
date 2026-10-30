const ContactModal = require("../Modal/ContactModal");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { Resend } = require("resend")

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

      const resend = new Resend(process.env.RESEND_API);

      
      var mailoptions = {
        // System email (Resend se email bhejne ke liye required hai)
        from: `${result.name} via Contact Form <onboarding@resend.dev>`,

        // User ka email yahan daalein (jab aap Reply karenge toh user ko mail jayega)
        replyTo: result.email,

        // Aapka apna email jahan aapko enquiry message receive karna hai
        to: process.env.Email,

        subject: `New Contact Enquiry from ${result.name}`,
        html: `
    <div style="background-color: #f9f9f9; padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="color: #333;">New Message Received</h2>
      <p><strong>From:</strong> ${result.name} (${result.email})</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #fff; padding: 10px; border-left: 4px solid #007bff;">
        ${result.message}
      </blockquote>
    </div>
  `
      };

      
      let { data, error } = await resend.emails.send(mailoptions);

      if (data) {
        const obj = {
          status: true,
          msg: "Thanking you for contacting to us...!",
          _data: result
        }
        response.send(obj)
      } else {
        const obj = {
          status: false,
          msg: "Something went wrong with sending an email...!",
          _data: null,
          errormsg:error
        }
        response.send(obj)
      }

    }).catch(() => {
      const obj = {
        status: false,
        msg: "Failed to send the email..!",
        _data: null
      }
      response.send(obj)
    })
  }
  catch (error) {
    console.error("Contact Form Error:", error);
    return response.send({
      status: false,
      msg: "Failed to process the contact us enquiry...!",
      _data: null,
      errormsg: error.message
    });
  }
};
