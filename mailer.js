const { createTransport } = require("nodemailer");

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.Gmail,
    pass: process.env.Password,
  },
});

const sendLawyerMail = async (email, data) => {
  const { customer_name, customer_email, customer_phone, date, time, service, message } = data;

  const text = `
You’ve received a new appointment request via FairlySettled.

Name: ${customer_name}
Email: ${customer_email}
Phone: ${customer_phone}
Date: ${date}
Time: ${time}
Service: ${service}
Message: ${message}

Please respond to the client as soon as possible.
— FairlySettled
`;

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New Appointment Request</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
    <table
      style="width: 100%; max-width: 600px; font-family: Arial, sans-serif; background-color: #ffffff; border: 1px solid #e0e0e0; padding: 20px;"
      align="center"
      cellpadding="0"
      cellspacing="0"
    >
      <tr>
        <td style="text-align: left;">
          <h2 style="color: #333333;">New Appointment Request</h2>
          <p style="font-size: 16px; color: #444;">Hello,</p>
          <p style="font-size: 16px; color: #444;">
            You’ve received a new appointment request via FairlySettled.
          </p>

          <table
            style="margin-top: 20px; width: 100%; border-collapse: collapse;"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Name:</td>
              <td style="padding: 8px; color: #444;">${customer_name}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px; color: #444;">${customer_email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 8px; color: #444;">${customer_phone}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #333;">Date:</td>
              <td style="padding: 8px; color: #444;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Time:</td>
              <td style="padding: 8px; color: #444;">${time}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #333;">Service:</td>
              <td style="padding: 8px; color: #444;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Message:</td>
              <td style="padding: 8px; color: #444; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>

          <p style="margin-top: 20px; font-size: 14px; color: #888;">
            Please respond to the client as soon as possible.
          </p>

          <p style="font-size: 14px; color: #999; margin-top: 30px;">
            — FairlySettled
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  await transport.sendMail({
    from: `"FairlySettled Appointments" <${process.env.Gmail}>`,
    to: email,
    subject: `New Appointment Request from ${customer_name}`,
    text,
    html,
  });
};

const sendClientMail = async (email, data) => {
      const { customer_name, lawyer_name, date, time, service } = data;

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Appointment Request Received</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
    <table
      style="width: 100%; max-width: 600px; font-family: Arial, sans-serif; background-color: #ffffff; border: 1px solid #e0e0e0; padding: 20px;"
      align="center"
      cellpadding="0"
      cellspacing="0"
    >
      <tr>
        <td style="text-align: left;">
          <h2 style="color: #1A73E8;">✅ Appointment Request Received</h2>
          <p style="font-size: 16px; color: #444;">
            Hi ${customer_name},
          </p>

          <p style="font-size: 16px; color: #444;">
            Thank you for booking an appointment. Your request has been received and is being processed.
          </p>

          <h3 style="margin-top: 20px; color: #333;">📋 Appointment Summary:</h3>
          <table style="margin-top: 10px; width: 100%; border-collapse: collapse;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Lawyer:</td>
              <td style="padding: 8px; color: #444;">${lawyer_name}<td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #333;">Date:</td>
              <td style="padding: 8px; color: #444;">${date}</td>
         </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Time:</td>
              <td style="padding: 8px; color: #444;">${time}</td>
         </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #333;">Service:</td>
              <td style="padding: 8px; color: #444;">${service}</td>            </tr>
          </table>

          <p style="margin-top: 20px; font-size: 14px; color: #444;">
            You will be contacted shortly to confirm the appointment. If you have any questions, feel free to reply to this email.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
  await transport.sendMail({ from: process.env.Gmail, to: email, subject: "Appointment Received", html });
};

module.exports = { sendLawyerMail, sendClientMail };
