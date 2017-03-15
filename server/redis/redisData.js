let driver = require('../config/neo4j');
const redis = require('redis');

let getDataFromNeo4j = {
    getConceptFromNeo4j: function(req, res) {
        let session = driver.session();
        const client = redis.createClient();
        let query = 'MATCH (n:Concept) RETURN n.name';
        session.run(query).then(function(result) {
            let conceptArray = [];
            result.records.map(function(item) {
              /*eslint-disable*/
                conceptArray.push(item._fields[0]);
                /*eslint-enable*/
            });

            for (let i = 0; i < conceptArray.length; i = i + 1) {
                client.sadd([
                    'concepts', conceptArray[i]
                    /*eslint-disable*/
                ], function(err) {
                    if (err) {
                        res.send('Error:' + err);
                    } else {
                        res.send(concepts);
                    }/*eslint-enable*/
                });
            }
        });
        session.close();
    },

    getIntentFromNeo4j: function(req, res) {
        let session = driver.session();
        const client = redis.createClient();
        let query = 'MATCH (n:Concept) RETURN n.name';
        session.run(query).then(function(result) {
            if (result) {
                let intentArray = [];
                 result.records.map(function(item) {
                   /*eslint-disable*/
                    intentArray.push(item._fields[0]);
                    /*eslint-enable*/
                });

                for (let i = 0; i < intentArray.length; i = i + 1) {
                    client.sadd([
                        'intents', intentArray[i]
                    ], function(err, reply) {
                        if (err) {
                            res.send('Error:' + err);
                        } else {
                            res.send('saved successfully' + reply);
                        }
                    });
                }
            }
        });
        session.close();
    },
    getQuestionFromNeo4j: function(req, res) {
        let session = driver.session();
        const client = redis.createClient();
        let query = 'MATCH (n:Concept) RETURN n.name';
        session.run(query).then(function(result) {
            let idArray = [];
             result.records.map(function(item) {
               /*eslint-disable*/
                idArray.push(item._fields[0].identity.low);
            //    console.log(item._fields[0].identity.low);
            /*eslint-enable*/
            });
            let questionArray = [];
             result.records.map(function(item) {
              /*eslint-disable*/
                questionArray.push(item._fields[0].properties.name);
            //    console.log(item._fields[0].properties.name);
            /*eslint-enable*/
            });

            for (let i = 0; i < idArray.length; i = i + 1) {
                client.hmset([
                    'question', idArray[i], questionArray[i]
                ], function(err, reply) {
                    if (err) {
                        res.send('Error:' + err);
                    } else {
                        res.send('saved' + reply);
                    }
                });
            }
        });
    }
};
module.exports = getDataFromNeo4j;
