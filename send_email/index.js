const express = require('express');
const app = express();
const port = 4646;
const nodemailer = require('nodemailer');
const path = require('path');


app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send("hello");
})

app.post('/send-email', async (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "gmail",
            pass: "password",
        },
    });


    await transporter.sendMail({
        from: "gmail ",
        to: "gmail muốn gửi tới",
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
    },(err) => {
        if (err) {
            res.send(err);
        }else {
            res.send("okii");
        }
    });

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})