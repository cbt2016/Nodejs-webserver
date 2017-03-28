var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});


app.use((req,res,next)=>{
   var now = new Date().toString();    
   var log = `${now} : ${req.method} : ${req.url} \n`;
   console.log(log);   
   fs.appendFile('server-log.txt',log,(err)=>{
       if(err){
           console.log(err.message);
       }
   });
   next();    
});

app.use((req,res,next)=>{
   res.render('maintenance.hbs');
       
});

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the home page'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About us:'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: '404 Not Found'
    });
});

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});
