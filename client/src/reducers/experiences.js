
import { FETCH_EXPERIENCE, FETCH_EXPERIENCES, DELETE_EXPERIENCE, UPDATE_EXPERIENCE, ADD_EXPERIENCE } from '../Constants/actionTypes';

const experiences = (experiences = [],action) => {
    switch (action.type) {
        case FETCH_EXPERIENCES: 
            return action.payload;
        case FETCH_EXPERIENCE: 
            return action.payload;
        case ADD_EXPERIENCE:
            return [...experiences, action.payload];
        case DELETE_EXPERIENCE: 
            return experiences.filter((experience) => experience._id !== action.payload)
        case UPDATE_EXPERIENCE:
            return experiences.map((experience) => (experience._id === action.payload._id ? action.payload : experience));
        default:
            return experiences;
    }
}

export default experiences; 