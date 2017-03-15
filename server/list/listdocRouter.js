'use strict';
const router = require('express').Router();
const listCtrl = require('./listdocController');

router.post('/add', listCtrl.addList);
router.get('/', listCtrl.viewList);
router.post('/invite', listCtrl.inviteFrnds);
router.post('/addquestion', listCtrl.addquestion);
router.put('/updateviews', listCtrl.updateviews);
router.get('/:id', listCtrl.getCardQuestion);
router.get('/getQuestionIntent', listCtrl.getQuestionIntent);
router.post('/getconcepts', listCtrl.getconcepts);
router.get('/suggestQues/:id', listCtrl.suggestQues);
router.post('/updateLike', listCtrl.updateLike);
router.post('/updateunlike', listCtrl.updateunlike);
router.post('/likestatus', listCtrl.likeStatus);
router.get('/getImages', listCtrl.getImages);
router.put('/updatecomment', listCtrl.updatecomments);
module.exports = router;
