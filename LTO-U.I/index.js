const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const hbs = require('hbs');

// const {getHomePage} = require('./routes/index');
// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 8000;

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
app.use(express.static(path.join(__dirname, '../'))); 
app.use(express.static(path.join(__dirname, '/'))); // configure express to use public folder
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


//route for insert data
//route for insert data
app.post('/insertenforcer',(req, res) => {
   var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
   let data = {
    fname: req.body.fname, 
    lname: req.body.lname, 
    mname: req.body.mname, 
    nationality: req.body.nation,
    sex: req.body.sex,
    zip: req.body.zip,
    email: req.body.email,
    pass: req.body.pass,
    address: req.body.address,
    bday: req.body.bday,
    birthplace: req.body.bplace,
    age: req.body.age,
    licence_no: req.body.license,
    dateregister: utc,
    usertype: "Enforcer",
    contact: req.body.contact
};

let sql = "INSERT INTO enforcertbl SET ?";
    let query = db.query(sql, data,(err, results) => {
    if(err) throw err;
    console.log("Success");
    res.redirect('enforcerregistration.html');
});
});

app.post('/insertdriver',(req, res) => {
   var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
   let data = {
    fname: req.body.fname, 
    lname: req.body.lname, 
    mname: req.body.mname, 
    nationality: req.body.nation,
    sex: req.body.sex,
    zip: req.body.zip,
    email: req.body.email,
    pass: req.body.pass,
    address: req.body.address,
    bday: req.body.bday,
    birthplace: req.body.bplace,
    age: req.body.age,
    licence_no: req.body.license,
    dateregister: utc,
    usertype: "Driver",
    contact: req.body.contact,
    balance: 2500

};

let sql = "INSERT INTO drivertbl SET ?";

    let query = db.query(sql, data,(err, results) => {
    if(err) throw err;
    console.log("Success");
    res.redirect('driverregistration.html');
 
});
});


app.post('/view',(req, res) => {
    console.log('asd');
    let sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from drivertbl";
    db.query(sql, function (err, results, fields) {
        if (err) throw err;
        sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from enforcertbl";
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
           
            res.render('search.hbs',{
            results: results,
            result: result
            });
            console.log("hey");
        });
    });
});


app.post('/search',(req, res) => {
    console.log(req.body.search);
    let sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from drivertbl where licence_no like '%"+ req.body.search +"%' || concat (fname,' ',mname,' ',lname) like '%"+req.body.search+"%'";
    db.query(sql, function (err, results, fields) {
        if (err) throw err;
        sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from enforcertbl where licence_no like '%"+ req.body.search +"%' || concat (fname,' ',mname,' ',lname) like '%"+req.body.search+"%'";
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            
            res.render('search.hbs',{
            results: results,
            result: result
            });
            console.log("hey");
        });
    });
});

app.get('/',(req, res) => {
    res.render('search.hbs');
});


app.get('/a',(req, res) => {
        let license = req.param('para1');
        let user = req.param('para2');
        let type = "asd";
        let sql;
        if(user == "Enforcer")
        {
            type = "Enforcer";
            sql = "select * from enforcertbl where licence_no = '"+license+"'";
        }
        else
        {  
            type = "Driver";
            sql = "select * from drivertbl where licence_no = '"+license+"'";
        }
        let usertype = {typeuser: type};
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            
            res.render('edit.hbs',{
            result: result
            });
            console.log("hayahay");
        });

});


app.post('/update',(req, res) => {
    let license = req.param('para1');
    let user = req.param('para2');
    console.log(license+" "+user);
    let sql;
    if(user == "Enforcer")
    {
        type = "Enforcer";
        sql = "select * from enforcertbl where licence_no = '"+license+"'";
    }
    else
    {  
        type = "Driver";
        sql = "select * from drivertbl where licence_no = '"+license+"'";
    }
    let usertype = {typeuser: type};
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        
        res.render('update.hbs',{
        result: result
        });
        console.log("hayahay");
    });
});



let gdno;
app.post('/saveupdate',(req, res) => {
    let license = req.param('para1');
    let user = req.param('para2');
    let dno = req.param('para3');
    let sql,data,history;
    console.log(dno);
    if(user == "Enforcer")
    {
        sql = "update enforcertbl set licence_no = '"+req.body.license+"', age = '"+req.body.age+
        "',birthplace = '"+req.body.bplace+"',bday = '"+req.body.bday+"',address = '"+req.body.address+
        "',pass = '"+req.body.pass+"',email = '"+req.body.email+"',zip = '"+req.body.zip+
        "',sex = '"+req.body.sex+"',nationality = '"+req.body.nation+"',mname = '"+req.body.mname+
        "',lname = '"+req.body.lname+"', fname = '"+req.body.fname+"' where licence_no = '"+license+"' ";
        gdno = dno;
    }
    else
    {  
        sql = "update drivertbl set licence_no = '"+req.body.license+"', age = '"+req.body.age+
        "',birthplace = '"+req.body.bplace+"',bday = '"+req.body.bday+"',address = '"+req.body.address+
        "',pass = '"+req.body.pass+"',email = '"+req.body.email+"',zip = '"+req.body.zip+
        "',sex = '"+req.body.sex+"',nationality = '"+req.body.nation+"',mname = '"+req.body.mname+
        "',lname = '"+req.body.lname+"', fname = '"+req.body.fname+"' where licence_no = '"+license+"' ";
        gdno = dno;
    }
    db.query(sql, function (err, result, fields) {
        if (err) throw err;

    
        if(user == "Driver")
        {
            console.log("driver update successfully");
            res.redirect('/afterupdatedriver');
        }
        else
        {
            console.log("Enforcer update successfully");
            res.redirect('/afterupdateenforcer');
        }
        });


});

app.get('/afterupdateenforcer',(req, res) => {
    console.log("pumasok");
    let sql = "select concat (fname,' ',mname,' ',lname) as name,dno,licence_no, nationality,sex , zip ,pass,contact,email,address,bday,birthplace,lname,fname,mname,age,dateregister,usertype  from enforcertbl where dno = "+gdno+"";
    
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
    let sql = "select b.vno,concat (a.fname,' ',a.mname,' ',a.lname) as name, a.licence_no, b.date, b.violation, b.location,b.status from drivertbl as a, violationtbl as b where a.dno = b.dno && b.enno = "+gdno+"";
    
    db.query(sql, function (err, violation, fields) {
        if (err) throw err;
        
            res.render('enforcer-profile.hbs',{
                result: result,
                violation: violation
        });
        }); 
    });
});


app.get('/afterupdatedriver',(req, res) => {
    let sql = "select concat (fname,' ',mname,' ',lname) as name,dno,licence_no, nationality,sex , zip ,pass,contact,email,address,bday,birthplace,lname,fname,mname,age,dateregister,usertype  from drivertbl where dno = "+gdno+"";
    
    db.query(sql, function (err, result, fields) {
        if (err) throw err;

        let sql = "select * from cartbl where dno = '"+gdno+"'";
    
        db.query(sql, function (err, car, fields) {
            if (err) throw err;
        let sql = "select a.vno, a.violation, a.location, a.date, (select concat(fname,' ',lname,' ',mname) from enforcertbl where dno = a.enno) as enforcer from violationtbl as a where status = 'Unpaid' and dno = "+gdno+"";
    
        db.query(sql, function (err, pviolation, fields) {
            if (err) throw err;

        let sql = "select a.vno, a.violation, a.location, a.date, (select concat(fname,' ',lname,' ',mname) from enforcertbl where dno = a.enno) as enforcer from violationtbl as a where status = 'Paid' and dno = "+gdno+"";

        db.query(sql, function (err, ppviolation, fields) {
                if (err) throw err;

            res.render('driver-profile.hbs',{
                result: result,
                car: car,
                pviolation: pviolation,
                ppviolation: ppviolation
                });
                console.log("hayahay");
        });
    });});
});

});


app.get('/searchdriver',(req, res) => { console.log('asd');
    let sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from drivertbl";
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('search-driver.hbs',{
            result: result
            });
        console.log("hey");
    });
});

app.get('/searchenforcer',(req, res) => { console.log('asd');
    let sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from enforcertbl";
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('search-enforcer.hbs',{
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
    else if(category == "Name")
    {
        sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from drivertbl where concat (fname,' ',mname,' ',lname) like '%" +search +"%'";
    }
    else
    {
        sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from drivertbl where concat (fname,' ',mname,' ',lname) like '%" +search +"%' || licence_no like '%" +search +"%' ";
    }
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('search-driver.hbs',{
            result: result
            });
        console.log("hey");
    });
});

app.post('/searchenforcerprofile',(req, res) => {
    let category = req.body.category;
    let search = req.body.search;
    let sql;
    console.log(category+" "+search);
    if(category == "License No.")
    {
        sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from enforcertbl where licence_no like '%" +search +"%' ";
    }
    else if(category == "Name")
    {
        sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from enforcertbl where concat (fname,' ',mname,' ',lname) like '%" +search +"%'";
    }
    else if(category == "Enforcer No.")
    {
        sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from enforcertbl where dno like '%" +search +"%'";
    }
    else
    {
        sql = "select dno,concat (fname,' ',mname,' ',lname) as name, licence_no,dateregister from enforcertbl where concat (fname,' ',mname,' ',lname) like '%" +search +"%' || licence_no like '%" +search +"%' ";
    }
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('search-enforcer.hbs',{
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

        let sql = "select * from cartbl where dno = '"+user+"'";
    
        db.query(sql, function (err, car, fields) {
            if (err) throw err;

            let sql = "select dno,licence_no, concat(lname,' ',fname,' ',mname) as name from drivertbl where dno ="+user;
    
            db.query(sql, function (err, driver, fields) {
                if (err) throw err;

                let sql = "select dno, concat(lname,' ',fname,' ',mname) as name from enforcertbl";
    
            db.query(sql, function (err, enforcer, fields) {
                    if (err) throw err;

            res.render('driver-profile.hbs',{
                result: result,
                car: car,
                driver: driver,
                enforcer: enforcer,
                });
                console.log("hayahay");
                
            });
        });
        });
    });

});


app.get('/enforcerprofile',(req, res) => {
    let license = req.param('para1');
    let user = req.param('para2');
    let sql = "select concat (fname,' ',mname,' ',lname) as name,dno,licence_no, nationality,sex , zip ,pass,contact,email,address,bday,birthplace,lname,fname,mname,age,dateregister,usertype  from enforcertbl where licence_no = '"+license+"'";
    
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        let sql = "select dno,licence_no, concat(lname,' ',fname,' ',mname) as name from drivertbl";
    
    db.query(sql, function (err, driver, fields) {
        if (err) throw err;

            res.render('enforcer-profile.hbs',{
                result: result,
                driver: driver
        });
        }); 
    });


});


app.post('/editprofile',(req, res) => {
    let license = req.param('para1');
    let user = req.param('para2');
    console.log(license+" "+user);
    let sql;
    if(user == "Enforcer")
    {
        type = "Enforcer";
        sql = "select * from enforcertbl where licence_no = '"+license+"'";
    }
    else
    {  
        type = "Driver";
        sql = "select * from drivertbl where licence_no = '"+license+"'";
    }
    let usertype = {typeuser: type};
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        
        res.render('updateprofile.hbs',{
        result: result
        });
        console.log("hayahay");
    });
});

app.get('/viewcar',(req, res) => {
    let sql = "select a.licence_no, b.dno ,concat (a.fname,' ',a.mname,' ',a.lname) as name,b.brand,b.model,b.color,b.platenumber,b.conductor from drivertbl as a, cartbl as b where a.dno = b.dno";

    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        
        res.render('search-car.hbs',{
        result: result
        });
        console.log("hayahay");
    });
});


app.post('/searchcar',(req, res) => {
    let category = req.body.category;
    let search = req.body.search;
    let sql;
    console.log(category+" "+search);
    
    if(category == "Plate number")
    {
        sql = "select a.licence_no,b.dno , concat (a.fname,' ',a.mname,' ',a.lname) as name,b.brand,b.model,b.color,b.platenumber,b.conductor from drivertbl as a, cartbl as b where a.dno = b.dno && b.platenumber like '%"+search+"%'";
    }
    else if(category == "Name")
    {
        sql = "select a.licence_no,b.dno , concat (a.fname,' ',a.mname,' ',a.lname) as name,b.brand,b.model,b.color,b.platenumber,b.conductor from drivertbl as a, cartbl as b where a.dno = b.dno && concat (fname,' ',mname,' ',lname) like '%"+search+"%'";
    }
    else if(category == "Conductor Sticker")
    {
        sql = "select a.licence_no,b.dno , concat (a.fname,' ',a.mname,' ',a.lname) as name,b.brand,b.model,b.color,b.platenumber,b.conductor from drivertbl as a, cartbl as b where a.dno = b.dno && b.conductor like '%"+search+"%'";
    }
    else
    {
        sql = "select a.licence_no,b.dno , concat (a.fname,' ',a.mname,' ',a.lname) as name,b.brand,b.model,b.color,b.platenumber,b.conductor from drivertbl as a, cartbl as b where a.dno = b.dno && b.platenumber like '%"+search+"%' || a.dno = b.dno && concat (fname,' ',mname,' ',lname) like '%"+search+"%' || a.dno = b.dno && b.conductor  like '%"+search+"%'";
    }
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('search-car.hbs',{
            result: result
            });
        console.log("hey");
    });
});

app.get('/registercar',(req, res) => {
    res.render('carregistrations.hbs');
});

app.get('/searchcar',(req, res) => {

    let search = req.param('para1');
    let sql = "select dno, concat(fname,' ',mname,' ',lname) as name,address,contact,licence_no from drivertbl where licence_no = '"+search+"'";
    db.query(sql, function (err, result, fields) {
        if (err) throw err;

        Object.keys(result).forEach(function(key) {
            var row = result[key];
            let sql1 = "select cno, brand, model, color, platenumber,conductor from cartbl where dno = "+row.dno;
            db.query(sql1, function (err, car, fields) {
                if (err) throw err;
                res.render('carregistrations.hbs',{
                    car: car,
                    result: result
                    });
                    console.log("hayahay");
                });
          });
       
    
      
    });
});

app.post('/addcar',(req, res) => {

    let search = req.param('para1');
    let data = {
        dno: search,
        brand: req.body.brand,
        model: req.body.model,
        color: req.body.color,
        platenumber: req.body.platenumber,
        conductor: req.body.conductor
    };

    let insert = "INSERT INTO cartbl SET ?";
    let query = db.query(insert, data,(err, results) => {
        if(err) throw err;
     
    let sql = "select dno, concat(fname,' ',mname,' ',lname) as name,address,contact,licence_no from drivertbl where dno = '"+search+"'";
    db.query(sql, function (err, result, fields) {
        if (err) throw err;

            let sql1 = "select cno, brand, model, color, platenumber,conductor from cartbl where dno = "+search;
            db.query(sql1, function (err, car, fields) {
                if (err) throw err;
                res.render('carregistrations.hbs',{
                    car: car,
                    result: result
                    });
                    console.log("hayahay");
                });
          
       
    
            });
      
    });
});


app.get('/payment',(req, res) => {
    let sql = "select dno,licence_no, concat(lname,' ',fname,' ',mname) as name from drivertbl";

    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        
    let sql = "select dno, concat(lname,' ',fname,' ',mname) as name from enforcertbl";
        db.query(sql, function (err, results, fields) {
            if (err) throw err;
        res.render('payment.hbs',{
        result: result,
        resuls: results
        });
        console.log("hayahay");
    });
    });
});

app.post('/searchpayment',(req, res) => {
    let category = req.body.category;
    let search = req.body.search;
    let sql;
    console.log(category+" "+search);
    if(category == "License No.")
    {
        sql = "select b.vno as dno, concat(a.fname,' ',a.mname,' ',a.lname) as name,a.licence_no, b.violation, b.date,(select concat(fname,' ',mname,' ',lname) from enforcertbl where dno = b.enno) as enforcer from drivertbl as a, violationtbl as b where a.dno = b.dno and b.status = 'Unpaid' and a.licence_no like '%" +search +"%' ";
    }
    else if(category == "Name")
    {
        sql = "select b.vno as dno, concat(a.fname,' ',a.mname,' ',a.lname) as name,a.licence_no, b.violation, b.date,(select concat(fname,' ',mname,' ',lname) from enforcertbl where dno = b.enno) as enforcer from drivertbl as a, violationtbl as b where a.dno = b.dno and b.status = 'Unpaid' and concat (a.fname,' ',a.mname,' ',a.lname) like '%" +search +"%'";
    }
    else if(category == "Violation")
    {
        sql = "select b.vno as dno, concat(a.fname,' ',a.mname,' ',a.lname) as name,a.licence_no, b.violation, b.date,(select concat(fname,' ',mname,' ',lname) from enforcertbl where dno = b.enno) as enforcer from drivertbl as a, violationtbl as b where a.dno = b.dno and b.status = 'Unpaid' and b.violation like '%" +search +"%'";
    }
    else
    {
        sql = "select b.vno as dno, concat(a.fname,' ',a.mname,' ',a.lname) as name,a.licence_no, b.violation, b.date,(select concat(fname,' ',mname,' ',lname) from enforcertbl where dno = b.enno) as enforcer from drivertbl as a, violationtbl as b where a.dno = b.dno and b.status = 'Unpaid' and concat (a.fname,' ',a.mname,' ',a.lname) like '%" +search +"%' || a.licence_no like '%" +search +"%' ||  b.violation like '%" +search +"%' ";
    }
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('payment.hbs',{
            result: result
            });
        console.log("hey");
    });
});

app.get('/hehez',(req, res) => {
    res.redirect("/payment");
});




