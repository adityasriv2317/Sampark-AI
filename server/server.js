const express = require("express");
const { sendMail } = require("./mailController");
const app = express();
require("dotenv").config();
let port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sampark.AI online!!");
});

app.post("/sendmail", sendMail);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Sampark.AI live on URL_ADDRESS:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
