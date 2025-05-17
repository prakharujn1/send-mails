require("dotenv").config();
const express = require("express");
const { sendLawyerMail, sendClientMail } = require("./mailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-appointment-mails", async (req, res) => {
  const {
    customer_name,
    customer_email,
    customer_phone,
    date,
    time,
    service,
    message,
    lawyer_email,
    lawyer_name
  } = req.body;

  const dataForLawyer = { customer_name, customer_email, customer_phone, date, time, service, message };
  const dataForClient = { customer_name, date, time, service, lawyer_name };

  try {
    await sendLawyerMail(lawyer_email, dataForLawyer);
    await sendClientMail(customer_email, dataForClient);
    res.status(200).json({ success: true, message: "Emails sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send emails" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
