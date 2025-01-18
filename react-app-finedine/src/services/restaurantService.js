import axios from 'axios';

const BASE_URL = 'http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant';

export const restaurantService = {
  async getAllRestaurants(ownerId) {
    try {
      const response = await axios.post(`${BASE_URL}/getAllRestaurants`, {
        ownerId: ownerId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error in getAllRestaurants:', error);
      throw error;
    }
  },

  // async updateRestaurant(formData) {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/updateRestaurant`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error in updateRestaurant:', error);
  //     throw error;
  //   }
  // },

  async updateRestaurant(formData) {
    try {
      const response = await axios.post(`${BASE_URL}/updateRestaurant`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error in updateRestaurant:', error);
      throw error;
    }
  },


  async deleteRestaurant(restaurantId) {
    try {
      const response = await axios.post(`${BASE_URL}/deleteRestaurant`, {
        restaurantId: restaurantId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error in deleteRestaurant:', error);
      throw error;
    }
  },

  async getRestaurantDetails(filters) {
    try {
      const response = await axios.post(`${BASE_URL}/getRestaurantDetails`, 
        filters,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error in getRestaurantDetails:', error);
      throw error;
    }
  },
  async createRestaurant(formData) {
    try {
      const response = await axios.post(
        `${BASE_URL}/createRestaurant`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error in createRestaurant:', error);
      throw error;
    }
  },
  
  async getRatingsForRestaurant(restaurantId) {
    try {
      const response = await axios.post(`${BASE_URL}/getRatingsForRestaurant`, {
        restaurantId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error in getRatingsForRestaurant:', error);
      throw error;
    }
  }
};

// import axios from "axios";

// // services/restaurantService.js
// const BASE_URL = '/api';

//   // export const restaurantService = {
//   // async getAllRestaurants(ownerId) {
//   //   const response = await fetch(`${BASE_URL}/restaurant/getAllRestaurants`, {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify({ ownerId })
//   //   });
//   //   return handleResponse(response);
//   // },

// export const restaurantService = {
//   async getAllRestaurants(ownerId) {
//     try {
//       const response = await fetch(`${BASE_URL}/restaurant/getAllRestaurants`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         credentials: 'include', // Include cookies if needed
//         body: JSON.stringify({ 
//           ownerId: ownerId || "674e373accdece1aaf971644" // Fallback to test ID if none provided
//         })
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('Restaurant data received:', data); // Debug log
//       return data;
//     } catch (error) {
//       console.error('Error in getAllRestaurants:', error);
//       throw error;
//     }
//   },

//   // async updateRestaurant(restaurantData) {
//   //   const response = await fetch(`${BASE_URL}/restaurant/updateRestaurant`, {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify(restaurantData)
//   //   });
//   //   return handleResponse(response);
//   // },

//   // async updateRestaurant(formData) {
//   //   try {
//   //     const response = await fetch(`${BASE_URL}/updateRestaurant`, {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'multipart/form-data' },
//   //       body: formData  // Don't set Content-Type header for FormData
//   //     });
//   //     return handleResponse(response);
//   //   } catch (error) {
//   //     console.error('Error in updateRestaurant:', error);
//   //     throw error;
//   //   }
//   // },

//   // services/restaurantService.js
//   async updateRestaurant(formData, imageFile) {
//     try {
//       const multipartFormData = new FormData();
      
//       // Add the restaurant data as a JSON string under 'restaurantData' key
//       multipartFormData.append('restaurantData', JSON.stringify(formData));
      
//       // Add the image file if it exists
//       if (imageFile) {
//         multipartFormData.append('image', imageFile);
//       }
  
//       const response = await axios.post(`${BASE_URL}/restaurant/updateRestaurant`, multipartFormData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         // Remove Content-Type header completely - browser will set it automatically
//         // with the correct boundary for multipart/form-data
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       return response.json();
//     } catch (error) {
//       console.error('Error in updateRestaurant:', error);
//       throw error;
//     }
//   },

//   async deleteRestaurant(restaurantId) {
//     const response = await fetch(`${BASE_URL}/restaurant/deleteRestaurant`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ RestaurantId: restaurantId })
//     });
//     return handleResponse(response);
//   },

//   async getRestaurantDetails(filters) {
//     const response = await fetch(`${BASE_URL}/restaurant/getRestaurantDetails`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(filters)
//     });
//     return handleResponse(response);
//   },

//   async getRatingsForRestaurant(restaurantId) {
//     const response = await fetch(`${BASE_URL}/restaurant/getRatingsForRestaurant`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ restaurantId })
//     });
//     return handleResponse(response);
//   }
// };

// const handleResponse = async (response) => {
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Something went wrong');
//   }
//   return response.json();
// };


// import axios from "axios";

// // services/restaurantService.js
// const BASE_URL = '/api';

//   // export const restaurantService = {
//   // async getAllRestaurants(ownerId) {
//   //   const response = await fetch(`${BASE_URL}/restaurant/getAllRestaurants`, {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify({ ownerId })
//   //   });
//   //   return handleResponse(response);
//   // },

// export const restaurantService = {
//   async getAllRestaurants(ownerId) {
//     try {
//       const response = await fetch(`${BASE_URL}/restaurant/getAllRestaurants`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         credentials: 'include', // Include cookies if needed
//         body: JSON.stringify({ 
//           ownerId: ownerId || "674e373accdece1aaf971644" // Fallback to test ID if none provided
//         })
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('Restaurant data received:', data); // Debug log
//       return data;
//     } catch (error) {
//       console.error('Error in getAllRestaurants:', error);
//       throw error;
//     }
//   },

//   // async updateRestaurant(restaurantData) {
//   //   const response = await fetch(`${BASE_URL}/restaurant/updateRestaurant`, {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify(restaurantData)
//   //   });
//   //   return handleResponse(response);
//   // },

//   // async updateRestaurant(formData) {
//   //   try {
//   //     const response = await fetch(`${BASE_URL}/updateRestaurant`, {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'multipart/form-data' },
//   //       body: formData  // Don't set Content-Type header for FormData
//   //     });
//   //     return handleResponse(response);
//   //   } catch (error) {
//   //     console.error('Error in updateRestaurant:', error);
//   //     throw error;
//   //   }
//   // },

//   // services/restaurantService.js
//   async updateRestaurant(formData, imageFile) {
//     try {
//       const multipartFormData = new FormData();
      
//       // Add the restaurant data as a JSON string under 'restaurantData' key
//       multipartFormData.append('restaurantData', JSON.stringify(formData));
      
//       // Add the image file if it exists
//       if (imageFile) {
//         multipartFormData.append('image', imageFile);
//       }
  
//       const response = await axios.post(`${BASE_URL}/restaurant/updateRestaurant`, multipartFormData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         // Remove Content-Type header completely - browser will set it automatically
//         // with the correct boundary for multipart/form-data
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       return response.json();
//     } catch (error) {
//       console.error('Error in updateRestaurant:', error);
//       throw error;
//     }
//   },

//   async deleteRestaurant(restaurantId) {
//     const response = await fetch(`${BASE_URL}/restaurant/deleteRestaurant`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ RestaurantId: restaurantId })
//     });
//     return handleResponse(response);
//   },

//   async getRestaurantDetails(filters) {
//     const response = await fetch(`${BASE_URL}/restaurant/getRestaurantDetails`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(filters)
//     });
//     return handleResponse(response);
//   },

//   async getRatingsForRestaurant(restaurantId) {
//     const response = await fetch(`${BASE_URL}/restaurant/getRatingsForRestaurant`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ restaurantId })
//     });
//     return handleResponse(response);
//   }
// };

// const handleResponse = async (response) => {
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Something went wrong');
//   }
//   return response.json();
// };

