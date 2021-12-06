
import { FETCH_SKILLS, UPDATE_SKILLS, DELETE_SKILLS, ADD_SKILLS } from '../Constants/actionTypes'

const skills = (skills = [],action) => {
    switch (action.type) {
        case FETCH_SKILLS: 
            return action.payload;
        case ADD_SKILLS:
            return [...skills, action.payload];
        case UPDATE_SKILLS:
                return skills.map((skill) => (skill._id === action.payload._id ? action.payload : skill));
        case DELETE_SKILLS: 
            return skills.filter((skill) => skill._id !== action.payload)
        default:
            return skills;
    }
}

export default skills; 