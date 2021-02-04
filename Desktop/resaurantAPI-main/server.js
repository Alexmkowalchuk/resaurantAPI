/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: ___Alex Kowalchuk__ Student ID: ___021861158___ Date: ___2021-01-20_____
*  Heroku Link: ______https://amk-web422-assignment1.herokuapp.com/________
********************************************************************************/ 

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const restaurantDB = require('./modules/restaurantDB');
const db = new restaurantDB('mongodb+srv://User:Spider-man!1mo@cluster0.ibhjm.mongodb.net/sample_restaurants?retryWrites=true&w=majority');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(cors());

app.get('/',(req,res)=>{
    res.json({"message" : "API listening"});
});

app.post('/api/restaurants/:data',(req,res)=>{
    let obj = db.addNewRestaurant(req.query.data);
    obj ? res.json(obj) : res.status(201).json({"message": "Failed to create"});
});

app.get('/api/restaurants',(req,res)=>{
    db.getAllRestaurants(req.query.page,req.query.perPage).then((results)=>{
        res.json(results);
    }).catch((results)=>{
        res.status(404).json({"message" : results.message});
    })
});

app.get('/api/restaurants/:id',(req,res)=>{
    db.getRestaurantById(req.params.id).then((result)=>{
        res.json(result);
    }).catch(()=>{
        res.status(404).json({"message" : "Resource not found"});
    });
});

app.put('/api/restaurants/:id',(req,res)=>{
    if(req.query.id != req.body._id){
        let obj = db.updateRestaurantById(req.body.data,req.query.id); 
        obj ? res.json(obj) : res/status(404).json({"message" : "Resource not found"});
    } else {
        res/status(404).json({"message" : "Resource not found"});
    }
});

app.delete('/api/restaurants/:id',(req,res)=>{
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