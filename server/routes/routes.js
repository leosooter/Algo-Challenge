const path = require('path');

const UserController = require(path.resolve('server','controllers','userController'));
const ChallengeController = require(path.resolve('server','controllers','challengeController'));
const SolutionController = require(path.resolve('server','controllers','solutionController'));
const ArenaController = require(path.resolve('server','controllers','arenaController'));

const multer  = require('multer');
const upload = multer({ dest: 'local_AWS/algos/'});

//SolutionController.destroyAll();

module.exports = function(app){
  console.log("routes.js Loaded");

  //User routes
  app.post('/user', UserController.register);
  console.log('/user POST route good');

  app.post('/user/login', UserController.login);
  console.log('/user/login route good');

  app.get('/user', UserController.getAll);
  console.log('/user GET route good');

  app.get('/user/:id', UserController.getOne);
  console.log('/user/:id route good');

  //Challenge routes
  app.post('/challenge', ChallengeController.create);
  console.log('/challenge POST route good');

  app.get('/challenge', ChallengeController.getAll);
  console.log('/challenge GET route good');

  app.get('/challenge/:id', ChallengeController.getOne);
  console.log('/challenge/:id route good');

  //Solution routes
  app.get('/solution', SolutionController.getAll);
  console.log('/solution GET route good');

  app.get('/solution/:id', SolutionController.getOne);
  console.log('/solution/:id route good');

  //Intercept file uploads and save to local_AWS storage for testing
  //Convert to AWS storage on deployment
  app.post('/solution/upload', upload.single('file'), function (req, res, next) {
    console.log("/solution/upload middleware");
    console.log(req.file);
    next();
  });

  app.post('/solution/upload', SolutionController.create);
  console.log('/solution/upload route good');

  //Arena routes
  app.post('/arena/test', ArenaController.testSolutions);
  console.log('/arena/test route good');
}
