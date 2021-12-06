
import { FETCH_EDUCATIONS, FETCH_EDUCATION, DELETE_EDUCATION, UPDATE_EDUCATION, ADD_EDUCATION } from '../Constants/actionTypes';

const educations = (educations = [],action) => {
    switch (action.type) {
        case FETCH_EDUCATIONS: 
            return action.payload;
        case FETCH_EDUCATION: 
            return action.payload;
        case ADD_EDUCATION:
            return [...educations, action.payload];
        case DELETE_EDUCATION: 
            return educations.filter((education) => education._id !== action.payload)
        case UPDATE_EDUCATION:
            return educations.map((education) => (education._id === action.payload._id ? action.payload : education));
        default:
            return educations;
    }
}

export default educations; 