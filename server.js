const express = require('express')
const cors = require('cors');
const morgan= require('morgan');
const dotenv= require('dotenv');
const colors= require('colors');
const connectDb = require('./config/connectDb');
const path = require('path');

//config env file
dotenv.config();

connectDb();
const app= express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/users',require('./routes/userRoutes'));
app.use('/api/v1/transactions',require('./routes/transactionRoutes'));
//statics files
app.use(express.static(path.join(__dirname,'./frontend/build')))
app.get('*',function(re,res){
    res.sendFile(path.join(__dirname,'./frontend/build/index.html'));
})
//port
const PORT= 8080 || process.env.PORT
//listen server

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);

});