const express = require("express");
const cors = require("cors");
require("dotenv").config();

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

let client;
try {
  client = mailgun.client({ username: "api", key: process.env.API_KEY });
  //  console.log(client);
} catch (error) {
  console.log(error.message);
}

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    // console.log(req.body);

    const messageData = {
      from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
      to: process.env.EMAIL,
      subject: "Mon mail custom",
      text: req.body.message,
    };

    const result = await client.messages.create(
      process.env.DOMAIN,
      messageData
    );
    console.log(result);
    res.json("Email sended");
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
