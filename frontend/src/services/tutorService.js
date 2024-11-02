import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tutors';

export const fetchTutors = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching tutors', error);
        return [];
    }
};

export const addTutor = async (tutorData) => {
    try {
        const response = await axios.post(`${API_URL}/add`, tutorData);
        return response.data;
    } catch (error) {
        console.error('Error adding tutor', error);
    }
};
