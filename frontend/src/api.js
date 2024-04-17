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
    const csrfToken = getCookie('csrftoken');
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
    getProperty(propId){
        return apiClient.get(`/property/${propId}/`);
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
        return apiClient.delete(`/property/${propertyId}`,
        {
           headers: {
               'X-CSRFToken': csrfToken,
           },
       });
    },
    putProperty(propertyId, propertyData){

        return apiClient.put(`/property/${propertyId}/`, propertyData,
        {
           headers: {
               'X-CSRFToken': csrfToken,
           },
       });
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
        return apiClient.put(`/lawn/${lawnId}/`, lawnData, {
            headers: {
                'X-CSRFToken': csrfToken,
            },
        });
    },
    putInterior(interiorId, interiorData){
        return apiClient.put(`/interior/${interiorId}/`, interiorData, {
            headers: {
                'X-CSRFToken': csrfToken, 
            },
        });
    },
    putInternet(internetId, internetData){
        return apiClient.put(`/internet/${internetId}/`, internetData, {
            headers: {
                'X-CSRFToken': csrfToken, 
            },
        });
    },
    putPhone(phoneId, phoneData){
        return apiClient.put(`/phone/${phoneId}/`, phoneData, {
            headers: {
                'X-CSRFToken': csrfToken, 
            },
        });
    },
    getLawnMatches(propId){
        return apiClient.get(`/scored-lawn-plans/${propId}`, {
            headers: {
                'X-CSRFToken': csrfToken, 
            },
        });

    },
    getInteriorMatches(propId){
        return apiClient.get(`/scored-interior-plans/${propId}`, {
            headers: {
                'X-CSRFToken': csrfToken, 
            },
        });

    },
    getPhoneMatches(propId){
        return apiClient.get(`/scored-phone-plans/${propId}`, {
            headers: {
                'X-CSRFToken': csrfToken, 
            },
        });

    },
    getInternetMatches(propId){
        return apiClient.get(`/scored-internet-plans/${propId}`, {
            headers: {
                'X-CSRFToken': csrfToken, 
            },
        });

    },

    putPlan(planId, planType, userId){
        return apiClient.put(`/${planType}_service_plan/${planId}/`, userId, {headers: {
            'X-CSRFToken': csrfToken, 
        },
    });
    },
    getActivePlans(propertyId){
        return apiClient.get(`/active-plans/${propertyId}/`, {headers: {
            'X-CSRFToken': csrfToken, 
        },
    });
    },
    
}