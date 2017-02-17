const jtw = require('jsonwebtoken');

module.exports.verifySync = function(req, res){
  // console.log("Req.headers =", req.headers);
  // console.log("req.headers.authorization", req.headers.authorization);
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.token;
  if(token){
    token = token.replace(/^Bearer\s*|^bearer\s*/, '');
    const decoded = jtw.verify(token, req.app.get('token-key'));
    console.log("Decoded =", decoded);
    return decoded;
  }
  else{
    console.log('No token found');
    return false;
  }
};

module.exports.sign = function(req, payload, options = {expiresIn : 10000}, callback){
  if(typeof options === "function"){
    callback = options;
    options = {expiresIn : 10000};
  }
  jtw.sign(payload, req.app.get('token-key'), options, function(error, token){
    if(error){
      console.log("Error from tokenAuth.js .sign method",error);
    }
    callback(error, token);
  })
}
