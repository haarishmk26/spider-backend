var express =require('express');
var app=express();
var mysql=require('mysql');
var path= require('path');
const bodyParser=require('body-parser');
var con=mysql.createConnection({
host:"localhost",
user:"root",
password:"elonmusk26",
multipleStatements:true,
//database:"userinfo"
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static_files'));
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname +'/index.html'));
});

con.connect((err)=>{if(err) console.log("error in connection"+err);
    console.log("connected!");
    var sql ="CREATE TABLE userinfo(username VARCHAR(255),password VARCHAR(255),email VARCHAR(255))";
    con.query(sql,()=>{if(err) throw err;
    else console.log("Table Created");
   });
});
app.post('/users',(req,res)=>{
    //var userinfomation=req.body;
    username1=req.body[0]["username"];
    password1=req.body[0]["password"];
    email1=req.body[0]["email"];
    console.log(username1);//changed this from req.body.username
    console.log(req.body[0].username);
    con.query('insert into userinfo(username,password,email) values=(?,?,?)'[username1,password1,email1],(err,rows,field)=>{
    if(!err)
    {console.log("details are entered and saved");
        res.sendFile(__dirname+'/index.html');
    }
    else console.log(err);
   })
});
//app.get('/users/user', function(request, response) {
//	response.sendFile(path.join(__dirname + '/index.html'));
//});
app.get('/users/:username',(req,res)=>{
    username=req.body["username"]
    con.query('select * from userinfo where username =?'[username],(err,rows,field)=>{//changed params to body here
   if(!err)console.log("its working");
    //res.send();
    else
    console.log(err);
});
});
app.get('/user', (req, res)=>{
console.log("its working");
res.send('this is working dont worry');
});
//app.get('/users/:userid',(req,res)=>{
//const getnamebyid = req.params.userid;
//console.log(getnamebyid);
//});

app.listen(5500,()=>console.log('listening to port 5500'));
