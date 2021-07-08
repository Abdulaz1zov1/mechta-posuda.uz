const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pathdir = require('path').join(__dirname, '/uploads')
const mongoose = require('mongoose');
const config = require ('./config/server');
const PORT = 3000;
const app = express();
const api = require('./routes/api');
mongoose.connect(config.mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log('Bazaga Ulandi');
    })
    .catch((err)=>{
        console.log('Xatolik', err);
    });

mongoose.set('useFindAndModify', false);

//user global
app.get('*',(req,res,next)=>{
    res.locals.user = req.user || null;
    next();
})

app.use(bodyParser.json());
app.use(cors({ rogin : "*" }));
app.use('/api',api);
app.use('/uploads', express.static(pathdir));``
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.get('/', function(req, res){
    res.send("Hello Server");
});

app.listen(PORT,()=> {
    console.log('Server running ' + PORT);
})

