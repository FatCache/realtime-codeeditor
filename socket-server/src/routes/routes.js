var express  = require('express');
var router = express.Router();


var controls = require('../authentication');


router.post('/posusers',controls.register);
router.get('/allusers',controls.getusers);
router.put('/:email/updateuser',controls.updateuser);
//router.post('',controls.register);


module.exports = router;