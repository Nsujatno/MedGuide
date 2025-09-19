# [Med Guide]
## Problem Statement:
Ever felt that "sick day struggle"? You're already feeling under the weather, but you still have to navigate the confusing pharmacy aisles, trying to figure out which medication to take and how much. It's frustrating and overwhelming. That's where "med guide" comes in. Think of it as your personal health assistant, designed to eliminate that stress. This mobile app provides a simple, accessible, and intelligent tool to guide you through common illnesses. By leveraging a custom-trained AI model, med guide gives you a personalized, data-driven recommendation for over-the-counter medication and a clear, easy-to-follow dosage schedule. It takes the guesswork out of getting better and puts a simple medication schedule on your in-app calendar.
## Product Features:
med guide will be a mobile application that provides a streamlined, AI-driven solution. 
The user journey will be as follows:
- Symptom Survey: The user will fill out a concise, multi-step survey detailing their symptoms (e.g., headache, cough, fever), their severity, and any relevant health conditions (e.g., allergies, pre-existing conditions). This data will be the primary input for our AI model.
- AI-Powered Recommendation Engine: Based on the survey data, a sophisticated deep learning model will analyze the user's input and recommend a suitable over-the-counter medicine and a personalized dosage schedule. The model's logic will be housed in a dedicated microservice for optimal performance.
- Personalized Calendar: The app will automatically populate a calendar on the home screen with the recommended medication times. Users will receive push notifications as reminders.
- Tracking: The calendar will allow users to mark when they have taken their medicine, providing a historical record and promoting adherence.
- Disclaimer: This application is intended for informational and organizational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Users should always consult with a qualified healthcare provider for any health concerns.
- Pharmacy Inventory & Pricing: The app will use Google maps API to quickly determine pharmacies in the vicinity of the user. Then Webscrape these websites to determine the stock of the medication they need and the price of it.

## Tech Stack:
- MongoDB (Database): To store user profiles, symptom survey results, medication logs, and calendar entries.
- Express.js (Backend Framework): To build the RESTful API and handle user authentication, data retrieval, and storage.
- React Native (Frontend): To build a cross-platform mobile app for iOS and Android.
- Node.js (Server Runtime): The runtime environment for the backend.
- Python (AI Backend): A dedicated microservice written in Python, using a framework like TensorFlow or PyTorch, will host the trained AI model. This service will receive data from the Express.js API, run the prediction, and return the recommendation.
## Team Roles: 
- Frontend: Aditi, Ira, Sreyasri
- Backend: Vaishnavi, Ira
- AI/ML: Vaishnavi
## Step Plan:
	Week 1. 
	Week 2.  
	Week 3.
 	Week 4.
  	Week 5.
   	Week 6.
	Week 7.
 	Week 8.
  	Week 9.
   	Week 10.
	Week 11.
 	Week 12.

## Milestones:

## Notes:

