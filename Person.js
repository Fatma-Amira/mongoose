
//Install and setup mongoose
//importer mongoose

const mongoose = require('mongoose');

//connecter à la base de données
mongoose.connect('mongodb+srv://fatma:0000@cluster0.emvbs.mongodb.net/db?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Create a person having this prototype:

const PersonSchema  = mongoose.Schema({
    name : { type: String, required: true },
    age : Number,
    favoriteFoods :[String]
});

const Person = mongoose.model('Person', PersonSchema);

//Create and Save a Record of a Model:
var CreateAndSavePerson= function(done){
    const Fatma = new Person({
   
        name: "fatma",
        age: 28,
        favoriteFoods: ['Apple', 'Banana']
      
        })
        console.log(Fatma)
Fatma.save((err,data)=>{
    if (error) {
       console.log(err) 
    } else {
        done(null,data)
        
    }
})
}
// Create many People with model.create()
var arrayOfPeople = [
  {name: "ons", age: 30, favoriteFoods: ["couscous"]},
  {name: "imen", age: 35, favoriteFoods: ["fraise,peche"]},
  {name: "sonia", age: 78, favoriteFoods: ["soupe"]}
];

var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) 
    { console.log(err)}
    else
    {  done(null, people)}
  
  });
}; 
// Use model.find() to Search Your Database
var findPeopleByName = function(personName, done) {
    Person.find({name: personName}, function (err, personFound) {
      if (err) return console.log(err);
      done(null, personFound);
    });
  };
//Use model.findOne() to Return a Single Matching Document from Your Database
var findOneByFood = function(food, done) {
    Person.findOne({favoriteFoods: food}, function (err, data) {
      if (err) return console.log(err);
      done(null, data);
    });
  };
  //Use model.findById() to Search Your Database By _id
  var findPersonById = function(personId, done) {
    Person.findById(personId, function (err, data) {
      if (err) return console.log(err);
      done(null, data);
    });
  };


  //Perform Classic Updates by Running Find, Edit, then Save
  const findEditThenSave = (personId, done) => {
    const foodToAdd = 'hamburger';
  
    // .findById() method to find a person by _id with the parameter personId as search key. 
    Person.findById(personId, (err, person) => {
      if(err) return console.log(err); 
    
      person.favoriteFoods.push("hamburger");
  
      person.save((err, updatedPerson) => {
        if(err) return console.log(err);
        done(null, updatedPerson)
      })
    })
  };

  //Perform New Updates on a Document Using model.findOneAndUpdate()

  const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
  
    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
      if(err) return console.log(err);
      done(null, updatedDoc);
    })
  };
  

  // Delete One Document Using model.findByIdAndRemove
 var removeById=function(personId, done){
  Person.findByIdAndRemove(personId, 
   (err, deleteRecord) => {
    if(err) return console.log(err);
    done(null, deleteRecord);
  })
}



  //MongoDB and Mongoose - Delete Many Documents with model.remove()
  const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({name: nameToRemove}, (err, response) => {
      if(err) return console.log(err);
      done(null, response);
    })
  };

  //Chain Search Query Helpers to Narrow Search Results

  Person.find({ age: 55 })
  .sort({ name: -1 })
  .limit(5)
  .select({ favoriteFoods: 0 })
  .exec(function(error, people) {
    //do something here
  });
