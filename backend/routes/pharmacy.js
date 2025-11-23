const express = require('express');
const router = express.Router();
const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const toRadians = (degrees) => degrees * (Math.PI / 180);

const calculateDistance = (lat1, lon1, lat2, lon2) => {
 const R = 3958.8; 
 const dLat = toRadians(lat2 - lat1);
 const dLon = toRadians(lon2 - lon1);
  const a =
   Math.sin(dLat / 2) * Math.sin(dLat / 2) +
   Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
   Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 return Math.round(R * c * 100) / 100;
};

router.get('/nearby', async (req, res) => {
 try {
   const { latitude, longitude, radius = 5000, maxResults = 20 } = req.query;
  
   if (!latitude || !longitude) {
     return res.status(400).json({
       success: false,
       error: 'Latitude and longitude are required'
     });
   }


   const lat = parseFloat(latitude);
   const lng = parseFloat(longitude);
   const searchRadius = Math.min(parseFloat(radius), 50000);


   if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
     return res.status(400).json({
       success: false,
       error: 'Invalid latitude or longitude values'
     });
   }


   const requestBody = {
     includedTypes: ['pharmacy'],
     maxResultCount: parseInt(maxResults),
     locationRestriction: {
       circle: {
         center: {
           latitude: lat,
           longitude: lng
         },
         radius: searchRadius
       }
     }
   };


   console.log('Request Body:', JSON.stringify(requestBody, null, 2));


   const response = await axios.post(
     'https://places.googleapis.com/v1/places:searchNearby',
     requestBody,
     {
       headers: {
         'Content-Type': 'application/json',
         'X-Goog-Api-Key': GOOGLE_API_KEY,
         'X-Goog-FieldMask': [
            'places.id',
            'places.displayName',
            'places.formattedAddress',
            'places.location'
            ].join(',')
        }
      }
    );

   const pharmacies = response.data.places?.map(place => {
     const distance = calculateDistance(
       lat,
       lng,
       place.location.latitude,
       place.location.longitude
     );


      return {
        id: place.id,
        name: place.displayName?.text || 'Unknown Pharmacy',
        address: place.formattedAddress || 'Address not available',
        location: {
          latitude: place.location.latitude,
          longitude: place.location.longitude
        },
        distance,
        distanceText: `${distance} mi`
     };
   }) || [];
   
   pharmacies.sort((a, b) => a.distance - b.distance);

    res.json({
      success: true,
      count: pharmacies.length,
      userLocation: { latitude: lat, longitude: lng },
      pharmacies
    });
  } catch (error) {
    console.error('Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers
    });

    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Failed to fetch nearby pharmacies',
      message: error.response?.data?.error?.message || error.message,
      details: error.response?.data
    });
  }
});

module.exports = router;
