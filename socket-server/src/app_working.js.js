const app = require('express')();
const http = require('http').Server(app);
var cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
// Provides aditional abstract layer over web sockets
const io = require('socket.io')(http);
var users  = require('./routes/routes');

// config variables
verbose = true ;
session_directory = "/tmp" ;

var fs = require( "fs" ) ;

// In memory database
const documents = {}

const deltasHistory = [];
const mongoose = require('mongoose');




///////////////////////////////////

//const { check } = require('express-validator/check');

mongoose.connect('mongodb://localhost:27017/userlogin');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("MongoDB database connection established successfully!");
});

/////////////////////////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/users',users);


app.listen('3000',() => {
  console.log("Server Running");
});



app.get('/',(req,res) => {
    res.json({'message':'Welcome'}); 
});






io.on("connection", socket => {
     console.log("Connected > socket");

    let previousId;

    const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId);
      previousId = currentId;
    };

    console.log("Room Called:" + previousId);
    
    // On document retrival
    socket.on("getDoc", docId => {
      safeJoin(docId);
      socket.emit("document", documents[docId]);
    });
  
    // Initilaize the Keys
    io.emit("documents", Object.keys(documents));

    // On Document creation
    socket.on("addDoc", doc => {
      documents[doc.id] = doc;
      safeJoin(doc.id);
      io.emit("documents", Object.keys(documents));
      socket.emit("document", doc);
    });
  
    // On document's text change
    socket.on("editDoc", doc => {
      documents[doc.id] = doc;
      socket.to(doc.id).emit("document", doc);
    });


    // #### Code Document Service ####


    // #### Code Document Service ####

    // Initiliaze history of changes
    socket.emit("deltasHistory",deltasHistory);

    socket.on("deltasHistory", r =>{
      socket.emit("deltasHistory",deltasHistory);
    })
    
    socket.on("updateCodeDocument", delta => {
      socket.broadcast.emit("currentCode",delta);
    
      // Update the history of deltas
      deltasHistory.push(delta);
    })

    //Clear all changes
    socket.on("clearHistory", e =>{
      deltasHistory.length = 0;
      console.log(deltasHistory)
      socket.emit("deltasHistory",deltasHistory);
    })
    
  }),
  
http.listen(4444)
