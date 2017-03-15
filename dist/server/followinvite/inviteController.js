'use strict';
// const User = require('../users/userEntity');
const UserProfile = require('../users/userProfileEntity').userModel;
const ListDoc = require('../list/listdocEntity');
const sentInviteMail = require('../function/sentInviteMail');
// let driver = require('../config/neo4j');
let inviteCtrl = {
sendInviteEmail: function (req) {
        // // console.log(req.body.data);
        // // console.log(req.body.questionId);
        // // console.log(req.body.emailId);
        // // console.log(req.body.senderName);
        let host = req.get('host');
        sentInviteMail(host, req.body.id, req.body.type, req.body.emailId, req.body.sender);
    },
    followQuestion: function(req, res) {
        let questionId = req.query.id;
        let email = req.query.email;
        // console.log('emaillllllll',email);
        // console.log('questionIdddddd',questionId);
        UserProfile.find({
            emailId: req.query.email
        }, function(err) {
            if (err) {
                res.send(err);
                // console.log('error occured');
            } else {
                // console.log(req.protocol + ':/' + req.get('host') + ':' + ('http://' + host));
                    // console.log('Domain is matched. Information is from Authentic email');
                    // console.log('Question Id', parseInt(questionId, 10));
                    let qId = parseInt(questionId, 10);
                    ListDoc.findOne({id: qId}, function(error, question)
                    {
                        // console.log(question);
                        let isQuesPresent = false;
                        UserProfile.findOne({emailId: email}, function(error1, user)
                        {
                        // console.log('user',user);
                        user.watchingList.map(function(item)
                        {
                            // console.log('type of question id   ',typeof(questionId));
                            // console.log('type of item.id   ',typeof(item.id));
                            if(item.id === qId)
                            {
                                isQuesPresent = true;
                            }
                        });
                        if(!isQuesPresent)
                        {
                            // console.log('Question is not present');
                        // let session = driver.session();
                        // var query = 'match (n:User) where n.name='+email+''+
                        //                 +'match (q:Question) where id(q)='+questionId+''+
                        //                 +'create (n)-[:follow]->(q)'+
                        //                 +'return n,q';
                        // session.run(query);
                        // session.close();
                        // console.log(question);
                        UserProfile.findOneAndUpdate({
                                emailId: req.query.email
                            }, {
                                $push: {
                                    watchingList: {
                                        id: question.id,
                                        displayImage: question.displayImage,
                                        heading: question.heading,
                                        statement: question.question,
                                        postedBy: question.postedBy,
                                        profileImage: question.profileImage,
                                        addedOn: question.addedOn,
                                        category: question.category,
                                        upVotes: question.upVotes,
                                        downVotes: question.downVotes,
                                        noofans: question.answerCounts
                                    }
                                }
                            }, {new: true}).then(() => {
                                // res.send(doc);
                            }, (error2) => {
                                res.send(error2);
                            });
                        }
                        else
                        {
                            // console.log('question is already present');
                        }
                    });
                    });
                        res.cookie('email', req.query.email);
                        res.redirect('/#/successfullyregistered');
            }
        });
    }
};
module.exports = inviteCtrl;
