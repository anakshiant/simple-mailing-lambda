const nodemailer = require("nodemailer");

async function handler(event, _context) {
  console.log(event.headers);

  const { base64 } = event.body;

  console.log(base64, "data");

  let transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 587,
    auth: {
      user: "", // generated ethereal user
      pass: "", // generated ethereal password
    },
  });

  await transporter.sendMail({
    from: "noreply@thinksys.com",
    to: "kumar.dhiraj@thinksys.com, anand@thinksys.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    attachments: [{ path: base64 }],
  });

  const response = {
    statusCode: 200,
  };
  return response;
}

module.exports = { handler };
