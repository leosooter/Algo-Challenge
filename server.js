const express = require('express');
const bp = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// const secret = "asdkflksdjgkl;jlsdfjgljslkd";
//Should be able to use below to automatically intercept and verify sensitive contents
//Also need to figure out how to re-sign token on every interaction
// app.use('/protected/', require().verify);

//Can also use advanced routing 

app.set('token-key', 'a^f%%464ffg64*%^ne&re%*rgy&^57');
app.use(express.static(path.join(__dirname, 'client')));
app.use('/js', express.static(path.join(__dirname, 'bower_components')));
app.use('/app', express.static(path.join(__dirname, 'application')));
app.use('/algo', express.static(path.join(__dirname, 'local_AWS/algos')));
app.use(bp.json());
app.use(bp.urlencoded({'extended' : true}));

require("./server/config/mongoose");
require("./server/routes/routes")(app);

app.listen(8000);


/*
TODO
////////////////////////////////////////////Back-End
research middleware structure

implement error handler


///////////////////////////////////////////Front-End
Finalize fonts and delete un-used!!!

add fomatting for object variables when displaying solutions

Add styling to solutions, challenges and add User page

//////////////////////////////////////////Full Stack
research and implement web-tokens *

Implement test on load for files
*/
