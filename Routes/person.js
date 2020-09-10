const express=require('express');
const router =express.Router();
let Person = require('../Models/Person');
//Create and Save a Record of a Model:
router.post('/addPerson',(req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const favoriteFoods = req.body.favoriteFoods;

    const newPerson = new Person ({ name,age,favoriteFoods});

    newPerson.save()
        .then((newPerson) => res.json(newPerson))
        .catch(err => res.status(400).json('Error: ' + err));
})
// Use model.find() to Search Your Database

router.get('/all',(req, res) => {
    Person.find()
    .then(Persons=>{res.send(Persons)})
    .catch(err=>console.log(err))
       
    })
//Create Many Records with model.create()
var arrayOfPeople = [
  {name: "ons", age: 30, favoriteFoods: ["couscous"]},
  {name: "imen", age: 35, favoriteFoods: ["fraise,peche"]},
  {name: "sonia", age: 78, favoriteFoods: ["soupe"]}
];

router.post('/addPersons',(req, res) => {
    Person.create(arrayOfPeopl).then((Person) => res.json(Person))
    .catch(err => res.status(400).json('Error: ' + err));
})


 // find person by his favorite food 
 router.get('/Person/:id', (req, res, next) => {
    Person.findOne(
      {favoriteFood: 'libanais'}
    ).then(Persons=>{res.send(Persons)})
    .catch(err=>console.log(err))
  });
    
        

  //Use model.findById() to Search Your Database By _id
  router.get('/:_id',(req, res) => {
    const {_id}=req.params
    Person.findById({_id}) 
    .then(Persons=>{res.send(Persons)})
    .catch(err=>console.log(err))
})
  //Perform Classic Updates by Running Find, Edit, then Save
  router.get('/:_id',(req, res) => {
    const {_id}=req.params

    const foodToAdd = 'hamburger';
  
    Person.findById({_id})    
     .then(
         Persons=>{person.favoriteFoods.push(foodToAdd)
  
             res.send(Persons)})

             .catch(err=>console.log(err))

             Person.save()
             .then((Person) => res.json(Person))
             .catch(err => res.status(400).json('Error: ' + err));
     
    })
  
  //Perform New Updates on a Document Using model.findOneAndUpdate()
  router.put('/editPerson/:_name',(req, res) => {
  const {_name}=req.params
    const {name , age ,favoriteFoods}= req.body
    Person.findOneAndUpdate({_name},{ $set:{ age:20}})
        
      .then(Persons=>{res.send(Persons)})
    .catch(err=>console.log(err))

  })
  // Delete One Document Using model.findOneAndDelete
  router.delete('/deletePerson/:_id',(req, res) => {
      const {_id}=req.params
    Person.findOneAndDelete({_id} )
    .then(Persons=>{res.send(Persons)})
    .catch(err=>console.log(err))
    
  })
   //MongoDB and Mongoose - Delete Many Documents with model.remove()
   router.delete('/deletePerson',(req, res) => {
    const nameToRemove = "Mary";
    Person.remove( nameToRemove)  .then(Persons=>{res.send(Persons)})
    .catch(err=>console.log(err))
  })
  

module.exports = router;