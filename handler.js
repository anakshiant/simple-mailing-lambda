const formidable = require("formidable");
const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");

const ses = new AWS.SES();

exports.handler = async (event, _context) => {
  const { fields, files } = resolveBody(event);
  const returnUrl = event.queryStringParameters.returnUrl;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    ses,
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: "noreply@thinksys.com",
    to: "kumar.dhiraj@thinksys.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    attachments: [
      { filename: files.multipleFiles.name, path: files.multipleFiles.path },
    ],
  });

  const response = {
    statusCode: 301,
    headers: {
      Location: returnUrl,
    },
  };
  return response;
};

function resolveBody(request) {
  const form = formidable({ multiples: true });

  return new Promise((resolve, reject) => {
    form.parse(request, (error, fields, files) => {
      if (error) {
        return reject(error);
      } else {
        return resolve({ fields, files });
      }
    });
  });
}
