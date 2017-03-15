const List = require('../list/listdocEntity');
let driver = require('../config/neo4j');
let searchController = {

    getPeople: function(req, res) {
        let session = driver.session();
        let query = 'match (n:Concept {name:"' + req.body.q + '"})<-[:follow]-(u:User) return u';
        session.run(query).then(function(result) {
            let arr = [];
            for (let x = 0; x < result.records.length; x = x + 1) {
                /* eslint-disable */
                let y = result.records[x]._fields[0].properties.name;
                /* eslint-enable */
                arr.push(y);
            }
            session.close();
            res.send(arr);
        }).catch(function() {
            res.send(['abc', 'def', 'xyz']);
        });
    },

    getQuestions: function(req, res) {
        let session = driver.session();
        let query = 'match (n)<-[r]-(m:Question) where n.name=~"(?i)' + req.body.q + '" return m';
        session.run(query).then(function(result) {
            let arr = [];
            for (let x = 0; x < result.records.length; x = x + 1) {
                /* eslint-disable */
                let y = result.records[x]._fields[0].identity.low;
                /* eslint-enable */
                arr.push(y);
            }
            const arrobj = [];
            List.find({
                id: {
                    $in: arr
                }
            }).then((docs) => {
                arrobj.push(docs);
                res.send(docs);
                session.close();
            });
        }).catch(function() {
            List.find().then((docs) => {
                res.send(docs);
                session.close();
            });
        });
        session.close();
    },

    getConcepts: function(req, res) {
        let query = 'match (n)<-[r]-(m:Concept) where n.name="' + req.body.concept + '" return m';
        let session = driver.session();
        session.run(query).then(function(result) {
            let json = [];
            for (let x = 0; x < result.records.length; x = x + 1) {
                /* eslint-disable */
                let y = result.records[x]._fields[0].properties.name;
                let i = result.records[x]._fields[0].Image;
                /* eslint-enable */
                json.push({name: y, image: i});
            }
            res.send(json);
            session.close();
        });
    },

    followUser: function(req, res) {
        let session = driver.session();
        /* eslint-disable */
        let query = 'match(n:User {name:"' + req.body.id + '"}),\
                 (m:User {name:"' + req.body.emailId + '"})\
                 create (n)-[:follow]->(m)\
                 return n,m;';
        /* eslint-enable */
        session.run(query).then(function() {
            session.close();
            res.send('success');
        });
    },

    isFollow: function(req, res) {
        let query = 'match (n:User {name:"' + req.body.name + '"})-[:follow]->(m:User) return m';
        let session = driver.session();
        session.run(query).then(function(result) {
            let namearr = [];
            for (let x = 0; x < result.records.length; x = x + 1) {
                /* eslint-disable */
                console.log(result.records[x]._fields[0].properties.name);
                let name = result.records[x]._fields[0].properties.name;
                /* eslint-enable */
                namearr.push(name);
            }
            let array = JSON.parse(req.body.emailArray);
            let follow = [];
            for (let received of array) {
              let temp = false;
              for(let mail of namearr) {
                if(received === mail) {
                  temp = true;
                }
              }
              if(temp) {
                follow.push({emailId: received, follow: true});
              }
              else {
                follow.push({emailId: received, follow: false});
              }
            }
            res.send(follow);
        });
    },
    isFollowTopic: function(req, res) {
        /* eslint-disable */
        let query = 'match (n:User {name:"' + req.body.name + '"})-[r:follow]->(m:Concept {name:"' + req.body.q + '"}) return r';
        /* eslint-enable */
        let session = driver.session();
        session.run(query).then(function(result) {
            session.close();
            if(result.records.length > 0) {
              res.send({follow: true});
            }
            else {
              res.send({follow: false});
            }
        });
    },
    followTopic: function(req, res) {
         let session = driver.session();
         /* eslint-disable */
         let query ='match(n:User {name:"' + req.body.id + '"}),(m:Concept {name:"' + req.body.concept + '"}) create (n)-[:follow]->(m) return n,m'
         /* eslint-enable */
         session.run(query).then(function() {
                session.close();
               res.send('success');
           });
    }
};

module.exports = searchController;
