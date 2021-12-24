const express = require('express');
const app = express();
const port = process.env.PORT || 4646;
require('dotenv').config();
const nodemailer = require('nodemailer');
const path = require('path');
const VerificationCode = require('./modules/VerificationCode.js');


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//tạo mảng chứa mã xác nhận
var VerificationCodes = new VerificationCode();


app.get('/', (req, res) => {
    res.send("hello");
})

//gửi gmail xác nhận
app.post('/sendVerificationcode', async (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_ADDRESS,
            pass: process.env.PASSWORD,
        },
    });
    let code = VerificationCodes.createCode(req.body.mail);

    let content = `<b>Mã xác nhận của bạn là : ${code}</b>`;

    transporter.sendMail({
        from: process.env.GMAIL_ADDRESS,
        to: req.body.mail,
        subject: "Mã xác nhận",
        text: "Mã xác nhận",
        html: content,
    }, (err) => {
        if (err) {
            res.send(err);
        } else {
            //vô hiệu mã xác nhận sau 60s
            setTimeout(() => {
                VerificationCodes.deleteCode(req.body.mail);
            }, 60000);
            res.send("okii");
        }
    });

});

//kiểm tra mã xác nhận
app.post('/VerificationCode', (req, res) => {
    if (VerificationCodes.verifyCode(req.body.mail, req.body.verifyCode)) {
        res.send("true");
    } else {
        res.send("false")
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
