const router = require('express').Router();
const mongoose = require('mongoose');

// define schema
const onboardingSchema = new mongoose.Schema({
  user_id: 
  { 
    type: String, 
    required: true 
  },
  
  weight: 
  { 
    type: Number, 
    required: true 
  },
  
  height: 
  { 
    type: Number, 
    required: true 
  },
  
  age: 
  { 
    type: Number, 
    required: true 
  },

  gender: 
  { 
    type: String, 
    required: true, 
    enum: ["male", "female", "other"] 
  },
    
  isPregnant: 
  { 
    type: Boolean, 
    default: false
  }, // only if female

  stressLevel: 
  { 
    type: String, 
    enum: ["low", "moderate", "high"], 
    default: "moderate" 
  },

  allergies: 
  { 
    type: String 
  },
  
  drugs: 
  { 
    type: Boolean, default: false 
  },    
  
  alcohol: 
  { 
    type: Boolean, 
    default: false 
  },
  
  comfortableWithPills: 
  {  
    type: Boolean, 
    default: true 
  }
});

//turns schema into model called Onboarding
const Onboarding = mongoose.model("Onboarding", onboardingSchema);

// define routes
router.post("/create", async (req, res) => {
  try {
    //creates variables for values in req.body
    const {
      user_id, weight, height, age, gender, isPregnant,
      stressLevel, allergies, drugs, alcohol, comfortableWithPills
    } = req.body;

    //new model using data from user
    const newOnboarding = new Onboarding({
      user_id, weight, height, age, gender, isPregnant,
      stressLevel, allergies, drugs, alcohol, comfortableWithPills
    })

    //saves onboarding data into mongodb
    const savedOnboarding = await newOnboarding.save()
    res.status(201).json(savedOnboarding)
  }
  
  catch(error) {
    console.log("Error saving onboarding information:", error);
    res.status(500).json({message: "error saving onboarding information", error: error.message})
  }
})

router.get("/get", async (req, res) => {
  try {
    //gets all documents from onboarding collection and sends it back
    const onboardingData = await Onboarding.find()
    res.status(200).json(onboardingData)
  } 
  catch (error) {
    console.log("error fetching onboarding data")
  }
})

router.get("/getByID", async (req, res) => {
  try {
    const userID = req.query.user_id;
    console.log('Received ID: ', userID)
    const onboardingData = await Onboarding.find({user_id: userID})
    if (!onboardingData){
      return res.status(404).json({message: "Onboarding data not found"})
    }
    res.status(200).json(onboardingData)
  }
  catch (error) {
    console.log("error fetching by id")
  }
})

//needs this line to work
module.exports = router;