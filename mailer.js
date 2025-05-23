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

Client: ${customer_name}
Email: ${customer_email}
Contact: ${customer_phone}
Date: ${date}
Time: ${time}
Service: ${service}
Note: ${message}

Kindly reach out to the client at your earliest convenience.
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
          <h2 style="color: #333333;">📝 Appointment Details via FairlySettled</h2>
          <p style="font-size: 16px; color: #444;">Hello,</p>
          <p style="font-size: 16px; color: #444;">
            You’ve received an appointment scheduled through FairlySettled.
          </p>

          <table
            style="margin-top: 20px; width: 100%; border-collapse: collapse;"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Client:</td>
              <td style="padding: 8px; color: #444;">${customer_name}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px; color: #444;">${customer_email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Contact:</td>
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
              <td style="padding: 8px; font-weight: bold; color: #333;">Note:</td>
              <td style="padding: 8px; color: #444; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>

          <p style="margin-top: 20px; font-size: 14px; color: #888;">
           Kindly reach out to the client at your earliest convenience.
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

  const text = `
Hi ${customer_name},

Thanks for reaching out through FairlySettled. Your appointment has been noted, and our team will be in touch shortly.

Lawyer: ${lawyer_name}
Date: ${date}
Time: ${time}
Service: ${service}

We'll be in touch shortly to confirm everything.

– FairlySettled Team
  `;

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Appointment Confirmation</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
    <table
      style="width: 100%; max-width: 600px; font-family: Arial, sans-serif; background-color: #ffffff; border: 1px solid #e0e0e0; padding: 20px;"
      align="center"
      cellpadding="0"
      cellspacing="0"
    >
      <tr>
        <td>
          <h2 style="color: #1A73E8;">✅ We've Received Your Details</h2>
          <p style="font-size: 16px; color: #444;">Hi ${customer_name},</p>

          <p style="font-size: 16px; color: #444;">
            Thanks for reaching out through FairlySettled. Your appointment has been noted, and our team will be in touch shortly.
          </p>

          <h3 style="margin-top: 20px; color: #333;">📋 Appointment Summary:</h3>
          <table style="margin-top: 10px; width: 100%; border-collapse: collapse;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Lawyer:</td>
              <td style="padding: 8px; color: #444;">${lawyer_name}</td>
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
          </table>

          <p style="margin-top: 20px; font-size: 14px; color: #444;">
            We’ll follow up to confirm your appointment. If you have any questions, you're welcome to contact us.
          </p>

          <p style="font-size: 14px; color: #999; margin-top: 30px;">
            – FairlySettled Team
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  await transport.sendMail({
    from: `"FairlySettled Team" <${process.env.Gmail}>`,
    to: email,
    subject: `Thanks ${customer_name}, we've noted your appointment`,
    text,
    html,
  });
};

module.exports = { sendLawyerMail, sendClientMail };
