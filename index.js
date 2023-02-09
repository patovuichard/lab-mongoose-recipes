const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";


// Connection to the database "recipe-app"
mongoose
  .connect("mongodb://127.0.0.1/test")
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Macarones con tomate",
      level: "Amateur Chef",
      ingredients: ["1/2 cup macarones", "5 tablespoons tomate"],
      cuisine: "Spanish",
      dishType: "main_course",
      image: "",
      duration: 20,
      creator: "Chef Beto",
    });
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data);
  })
  .then((response) => {
    console.log(response);

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((response) => {
    console.log(response);
    return Recipe.deleteOne({title:"Carrot Cake"})
  })
  .then((response)=>{
    console.log(response)
  })
  
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

  mongoose.connection.close(function () {
    console.log('Mongoose está cerrado');
  });