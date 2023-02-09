const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect("mongodb://localhost:27017")
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      "title": "Macarones con tomate",
      "level": "Amateur Chef",
      "ingredients": [
        "1/2 cup macarones",
        "5 tablespoons tomate",
      ],
      "cuisine": "Spanish",
      "dishType": "main_course",
      "image": "",
      "duration": 20,
      "creator": "Chef Beto"
    })
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data)
  })
  .then((response)=>{
    console.log(response)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
