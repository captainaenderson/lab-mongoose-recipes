const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
   .connect(MONGODB_URI)
   .then((x) => {
      console.log(`Connected to the database: "${x.connection.name}"`);
      // Before adding any recipes to the database, let's remove all existing ones
      return Recipe.deleteMany();
   })
   .then(() => {
      // Run your code here, after you have insured that the connection was made
      const Cake = {
         title: 'Vanilla Cake',
         level: 'Easy Peasy',
         ingredients: [
            'sugar',
            'milk',
            'butter',
            'flour',
            'eggs',
            'baking powder',
            'vanilla extract',
         ],
         cuisine: 'German',
         dishType: 'dessert',
         duration: 55,
         creator: 'Anna',
      };
      return Recipe.create(Cake);
   })
   .then((response) => {
      console.log(`Here is the ${response.title}`);
      return Recipe.insertMany(data);
   })

   .then((response) => {
      console.log('duration set to 100 successfully', response);
      return Recipe.findOneAndUpdate(
         {
            title: 'Rigatoni alla Genovese',
         },
         { duration: 100 },
         { new: true }
      );
   })

   .then((response) => {
      console.log('Carrot cake deleted', response);
      return Recipe.deleteOne({ title: 'Carrot Cake' });
   })

   .catch((error) => {
      console.error('Error connecting to the database', error);
   });
