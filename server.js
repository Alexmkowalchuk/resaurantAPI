/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: ___Alex Kowalchuk____ Student ID: ______________ Date: ______2021-01-20______
*  Heroku Link: ______https://amk-web422-assignment1.herokuapp.com/________
********************************************************************************/ 

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const restaurantDB = require('./modules/restaurantDB');
const db = new restaurantDB('mongodb+srv://User:Spider-man!1mo@cluster0.ibhjm.mongodb.net/A1?retryWrites=true&w=majority');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(cors());

app.post('api/restaurants/:data',(req,res)=>{
    let result = db.addNewRestaurant(req.query.data);
    res.json(result);
});

app.get('/api/restaurants/?:page?:perPage',(req,res)=>{
    console.log(req.query.page + req.query.perPage);
    let obj = db.getAllRestaurants(req.query.page,req.query.perPage);
    res.json(obj);
});

app.get('api/restaurants/:id',(req,res)=>{
    let obj = db.getRestaurantById(req.query.id);
    obj ? res.json(obj) : res.status(404).json({"message": "Bad"}); 
});

app.put('api/restaurants/:data,id',(req,res)=>{
   db.updateRestaurantById(req.query.data,req.query.id); 
});

app.delete('api/restaurants/:id',(req,res)=>{
    if(db.getRestaurantById(req.query.id)) {
        result = db.deleteRestaurantById(req.query.id);
    }
    res.status(204).end();
});


db.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});