require('dotenv').config();
///1) Install & Set up mongoose
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("🚨 MONGO_URI n'est pas défini. Vérifie ton .env");
}
const { Schema } =mongoose;
mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology: true,});

//2) Create a 'Person' Model
 const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

//3 ) Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "IMANE",
    age: 20,
    favoriteFoods: ["Pizza", "Iced Coffee"]
  });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });

};
//4  Create many People
var arrayOfPeople = [
  {name: "IMANE", age: 20, favoriteFoods: ["Iced Coffee"]},
  {name: "IMN", age: 21, favoriteFoods: ["Pizza"]},
  {name: "EMMA", age: 22, favoriteFoods: ["apple"]},
];

var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

// 5 ) Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });  
};
// question  6
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
// questio  7:
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};
// question 8:
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

// question 9:
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
  };

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {

  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort("name").limit(2).select(["name","favoriteFoods"]).exec((err, data) =>{
done(err ,data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
