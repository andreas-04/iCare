import axios from 'axios';

const apiClient = axios.create({
    // The base URL for all HTTP requests
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json',
    },

    withCredentials: true,
    });

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const postPlan = async (plan, planType) => {
        const csrfToken = getCookie('csrftoken'); // Adjust the cookie name if necessary
        return apiClient.post(`/${planType}_service_plan/`, plan, {
            headers: {
                'X-CSRFToken': csrfToken,
            },
        });
    };
export default{
    postPlan,
    userLogin: async (credentials) => {
        try {
            const response = await apiClient.post('/login/', credentials);
            console.log(response);
            return response; // Ensure the response is returned
            
        } catch (error) {
            console.error(error);
            throw error; // Rethrow the error so it can be caught and handled in the calling function
        }
    },
    logout: async () => {
        try {
            // Retrieve the CSRF token from cookies or another source
            const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken')).split('=')[1];

            // Include the CSRF token in the request headers
            const response = await apiClient.post('/logout/', {}, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                withCredentials: true,
            });
            console.log(response.data);
            // Handle successful logout, e.g., redirect to login page
        } catch (error) {
            console.error('Error logging out:', error);
            // Handle errors, e.g., show an error message
        }
    },

    getProperties(userId){
        return apiClient.get(`/users/${userId}/properties`);
    },
    addProperty(userId){
        const csrfToken = getCookie('csrftoken'); // Retrieve the CSRF token
        return apiClient.post(`/property/`, userId,
         {
            headers: {
                'X-CSRFToken': csrfToken,
            },
        });
    },
    deleteProperty(propertyId){
        const csrfToken = getCookie('csrftoken'); // Retrieve the CSRF token
        return apiClient.delete(`/property/${propertyId}`,
        {
           headers: {
               'X-CSRFToken': csrfToken,
           },
       });
    },
    putProperty(propertyId, propertyData){
        return apiClient.put(`/properties/${propertyId}`, propertyData);
    },
    getLawn(lawnId){
        return apiClient.get(`/lawn/${lawnId}/`);
    },
    getInterior(interiorId){
        return apiClient.get(`/interior/${interiorId}/`);
    },
    getInternet(internetId){
        return apiClient.get(`/internet/${internetId}/`);
    },
    getPhone(phoneId){
        return apiClient.get(`/phone/${phoneId}/`);
    },
    putLawn(lawnId, lawnData){
        const csrfToken = getCookie('csrftoken'); // Retrieve the CSRF token
        return apiClient.put(`/lawn/${lawnId}/`, lawnData, {
            headers: {
                'X-CSRFToken': csrfToken,
            },
        });
    },
    putInterior(interiorId, interiorData){
        const csrfToken = getCookie('csrftoken'); // Retrieve the CSRF token
        return apiClient.put(`/interior/${interiorId}/`, interiorData, {
            headers: {
                'X-CSRFToken': csrfToken, 
            },
        });
    },
    putInternet(internetId, internetData){
        const csrfToken = getCookie('csrftoken'); // Retrieve the CSRF token
        return apiClient.put(`/internet/${internetId}/`, internetData, {
            headers: {
                'X-CSRFToken': csrfToken, 
            },
        });
    },
    putPhone(phoneId, phoneData){
        const csrfToken = getCookie('csrftoken'); // Retrieve the CSRF token
        return apiClient.put(`/phone/${phoneId}/`, phoneData, {
            headers: {
                'X-CSRFToken': csrfToken, 
            },
        });
    },
    

    
    
}