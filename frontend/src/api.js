import axios from 'axios';

const apiClient = axios.create({
    // The base URL for all HTTP requests
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json',
    },

    withCredentials: true,
  });

export default{
    userLogin: async (credentials) => {
        try {
            const response = await apiClient.post('/login/', credentials);
            return response; // Ensure the response is returned
        } catch (error) {
            console.error(error);
            throw error; // Rethrow the error so it can be caught and handled in the calling function
        }
    },
    
    
}