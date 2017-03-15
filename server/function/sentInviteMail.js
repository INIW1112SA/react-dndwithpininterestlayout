const User = require('../users/userEntity');
const nodemailer = require('nodemailer');

let sentInviteMail = function(host, id, type, emailId, sender)
{
            User.find({
            email: emailId
        }, function(err, res) {
            if (err) {
                res.send(err);
              //  console.log('error ocuured');
            } else {
                /*eslint-disable */
                // Create a Nodemailer transport object
                let transporter = nodemailer.createTransport({
                    /*eslint-disable */
                    service: 'Gmail',
                    secure: true,
                    auth: {
                        user: 'zynla0001@gmail.com', // Your email id
                        pass: 'Zynla@123' // Your password
                    }
                });

                console.log('host', host);
                let link = 'http://' + host + '/followinvite/followQuestion?id='
                 + id + '&email='
                  + emailId;
                let text = 'Hello from \n\n' + sender;
                let mailOptions = {
                    from: 'zynla0001@gmail.com', // sender address
                    to: emailId, // reciever
                    subject: sender + 'invite you to follow' + id, // Subject line
                    text: text,
                    html: '<center><h1>Welcome to Zynla</h1></center><br><br><br>'+
                    'Hi, <br><br>To complete Signup Click on the button to verify yourself.'+
                    '<br><br><br><a href=' + link + ' style=background-color:#44c767;'+
                    '-moz-border-radius:28px;-webkit-border-radius:28px;border-radius:28px;'+
                    'border:1px solid #18ab29;display:inline-block;padding:16px 31px;'+
                    'color:#ffffff;text-shadow:0px 1px 0px #2f6627;'+
                    'text-decoration:none;> Follow </a><br><br>'+
                    '<i>This link is valid for an hour.This is an Auto-generated mail, '+
                    'please do not reply</i></small>'
                };
                console.log(mailOptions + host);
                // Sent mail to recipient
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Message sent: ' + info.response);
                        // res.json({yo: info.response});
                    }
                });
            }
        });
};

module.exports = sentInviteMail;
