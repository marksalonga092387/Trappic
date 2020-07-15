const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const hbs = require('hbs');

// const {getHomePage} = require('./routes/index');
// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'trappic',
    password: 'sa',
    database: 'trappicdb'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/'); // set express to look in this folder to render our view
app.set('view engine', 'hbs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, '../'))); // configure express to use public folder
app.use(express.static(path.join(__dirname, '/'))); 
app.use(fileUpload()); // configure fileupload
//app.use('/assets',express.static(__dirname + '/'));

// routes for the app
/*
app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);
*/

// set the app to listen on the port
app.listen(port,'0.0.0.0', () => {
    console.log(`Server running on port: ${port}`);
});

let eno = "";


app.get('/profile',(req, res) => { 
    console.log('asd');
    let sql = "select concat (fname,' ',mname,' ',lname) as name, age, address, contact, bday, licence_no,pass from enforcertbl where dno = '"+eno+"'";
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('profile.hbs',{
            result: result
            });
        console.log("hey");
    });
});


app.get('/searchdriver',(req, res) => { console.log('asd');
    let sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from drivertbl";
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('ticket.hbs',{
            result: result
            });
        console.log("hey");
    });
});


app.post('/searchdriverprofile',(req, res) => {
    let category = req.body.category;
    let search = req.body.search;
    let sql;
    console.log(category+" "+search);
    if(category == "License No.")
    {
        sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from drivertbl where licence_no like '%" +search +"%' ";
    }
    else if(category == "Conductor Sticker")
    {
        sql = "select a.dno,concat (a.fname,' ',a.mname,' ',a.lname) as name, a.licence_no,a.dateregister,b.cno from drivertbl as a, cartbl as b where a.dno = b.dno and b.conductor = '"+search+"'";
    }
    else if(category == "Plate Number")
    {
        sql = "select a.dno,concat (a.fname,' ',a.mname,' ',a.lname) as name, a.licence_no,a.dateregister,b.cno from drivertbl as a, cartbl as b where a.dno = b.dno and b.platenumber = '"+search+"'";
    }
    else
    {
        sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from drivertbl where concat (fname,' ',mname,' ',lname) like '%" +search +"%' ";
    }
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('ticket.hbs',{
            result: result
            });
        console.log("hey");
    });
});


app.get('/driverprofile',(req, res) => {
    let license = req.param('para1');
    let user = req.param('para2');
    let sql = "select concat (fname,' ',mname,' ',lname) as name,dno,licence_no, nationality,sex , zip ,pass,contact,email,address,bday,birthplace,lname,fname,mname,age,dateregister,usertype  from drivertbl where licence_no = '"+license+"'";
    
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('driver-profile.hbs',{
                result: result
                });
                console.log("hayahay");
    });
});

app.post('/fileticket',(req, res) => {
    let license = req.param('para1');
    let sql = "select concat (fname,' ',mname,' ',lname) as name,dno,licence_no, nationality,sex , zip ,pass,contact,email,address,bday,birthplace,lname,fname,mname,age,dateregister,usertype  from drivertbl where licence_no = '"+license+"'";
    
    db.query(sql, function (err, result, fields) {
        if (err) throw err;

        
    sql = "select dno from enforcertbl where dno = "+eno+"";

    db.query(sql, function (err, results, fields) {
        if (err) throw err;
        res.render('file-ticket.hbs',{
                result: result,
                results: results
                });
                console.log("hayahay");
            });
    });
});

app.post('/ticket',(req, res) => {
    let dno = req.param('para1');
    let license = req.param('para2');
        /*
    let data = {product_name: req.body.product_name, product_price: req.body.product_price};
    let sql = "INSERT INTO product SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
    */
   var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
   let data = {
    dno: dno,
    violation: req.body.violation,
    location: req.body.location,
    enno: eno,
    status: 'Unpaid',
    date: utc
    };
    let sql = "INSERT INTO violationtbl SET ?";

    let query = db.query(sql, data,(err, results) => {
    if(err) throw err;

    let sql = "select concat (fname,' ',mname,' ',lname) as name,dno,licence_no, nationality,sex , zip ,pass,contact,email,address,bday,birthplace,lname,fname,mname,age,dateregister,usertype  from drivertbl where licence_no = '"+license+"'";
    
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('driver-profile.hbs',{
                result: result
                });
                console.log("hayahay");
    });
    //res.redirect('driverregistration.html');
 
});

});

app.get('/home',(req, res) => { 
    
    console.log("qwe");
    let sql = "select dno from enforcertbl where dno = "+eno+"";
    
    db.query(sql, function (err, result, fields) {
    if (err) throw err;
    
    

    res.render('index.hbs',{
            result: result
            });
            console.log("hayahay");
});
});

app.get('/history',(req, res) => {
    let sql = "select dno from enforcertbl where dno = "+eno+"";
    
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('history.hbs',{
                result: result
                });
                console.log("hayahay");
    });
});


app.get('/',(req, res) => { 
    let sql = "select dno,email,pass,licence_no from enforcertbl";
    
    db.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render('login.hbs',
    {
        result : result
    });
    });
});

app.get('/login',(req, res) => { 
    let user = req.param("para1");
    eno = user;
    res.redirect('/home');
});


app.get('/updatepass',(req, res) => {
    
    let pass = req.param('para1');
    let sql = "update enforcertbl set pass = '"+pass+"' where dno = "+eno;
    
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.redirect("/profile");
    });
});