const Users = require('./model/users');

exports.register =  (req,res) => {
    console.log("gfgfiuguihigbigiuhiuhhoihoiho");
    console.log(req);
       var user = new Users({
           email: req.body.email,
           name : req.body.name,
           password : req.body.password
       });
       if(req.body.email.match(/[a-zA-Z0-9_.-]+@[a-zA-Z]+\.[a-zA-Z]+/)&&(req.body.password.length>8)){
           user.save().
           then(() => {
               res.sendStatus(200);
           }).catch(()=>{
               res.status(400).send({message : 'Bad Request (Invalid Username/Password)'});
           });
       }else{
           res.status(400).send({message : 'Please enter email/password in correct format'});
       }
};

// DELETING THE USER FROM DATABASE
// exports.delete = (req,res) => {
//    User.deleteOne({userName:req.params.userName}).
//    then(user => {
//        res.send({'message':req.params.userName});
//    });
// };

exports.getusers = (req,res) => {
    Users.find(function(err,user){
       res.send(user);})
 };

 exports.updateuser = (req,res) => {
     console.log(req.body.name);
    Users.findOneAndUpdate(req.params.email, {$set: {'name': req.body.name}},function(err,user){
       res.send("updated");})
 };
