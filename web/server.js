let mysql = require('mysql');
let express = require('express');
let session = require('express-session');
let path = require('path');

let connection = mysql.createConnection({
    host     : process.env.DB_HOST || 'mysql',   
    user     : process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD || 'root123',
    database : process.env.DB_NAME || 'email'
});

connection.connect((err) => { 
  if (err) throw err; 
    console.log("MySQL connected..."); 
  });

let app = express();

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
let publicpath=path.join(__dirname,'public')

// http://localhost:3000/
app.get('/', function(request, response) {
  // Render login template
  response.sendFile(`${publicpath}/index.html`);
});

app.post('/contact',(req,res)=>{
  let email=req.body.email1;
  let message=req.body.message1;  
  let sql="INSERT INTO messages (email, message) VALUES('"+email+"','"+message+"')";
  connection.query(sql, function (err, result, fields) {
      if (err){
          console.log(err)
      }else{
          res.sendFile(`${publicpath}/index2.html`)
      }
      // console.log(result.length);
  })
});
app.listen(3000);