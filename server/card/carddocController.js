// written by Arun Mohan Raj
// requiring necrssary files
let driver = require('../config/neo4j');
let session = driver.session();
const Answer = require('./carddocEntity');
const TopCards = require('../list/listdocEntity');
let cardController = {
  // function to add answer in neo4j and mongoDB
    addAnswer: function(req, res) {
        // console.log('inside add router');
        /*eslint-disable*/
        let query = ' \
                    match (q:Question), \
                   (u:User {name:"' + req.body.mail + '"}) \
                   where id(q) = 973 \
                   create (n:Answer {Content:"' + req.body.content + '"}), \
                   (l:Like {count:0}), \
                   (dl:Unlike {Count:0}), \
                   (n)-[:has]->(l),\
                   (l)-[:context_of]->(q),\
                   (n)-[:has]->(dl),\
                   (dl)-[:context_of]->(q),\
                   (n)-[:answer_of]->(q), \
                   (u)-[:post {on : timestamp()}]->(n) \
                   return n \
                    ';
        /*eslint-enable*/
        session.run(query).then(function(result) {
            // console.log('query run :', result);
            /*eslint-disable*/
            let id = result.records[0]._fields[0].identity.low;
            let queId = req.body.questionId;
            /*eslint-enable*/
            let db = new Answer({id: id, createdBy: req.body.mail,
              content: req.body.content, answeredOn: new Date().getTime()});
            // adding data in carddocs collection
            db.save(function(err) {
                if (err) {
                    // res.send('Error:' + err);
                } else {
                    // res.send('saved successfully');
                }
            });
            // adding data in listdocs topcard property
            TopCards.findOneAndUpdate({
                id: queId
            }, {
            $push: {
                topCards: {
                      id: id,
                      createdBy: req.body.mail,
                      content: req.body.content,
                      createdOn: new Date().getTime(),
                      upVote: 0,
                      downVote: 0
                }
            }
        }, {new: true}).then((doc) => {
            res.send(doc);
        }, () => {
            // res.send(err);
        });
        });
    }
};

module.exports = cardController;
