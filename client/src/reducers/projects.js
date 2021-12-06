
import { FETCH_PROJECT, FETCH_PROJECTS, DELETE_PROJECT, UPDATE_PROJECT, ADD_PROJECT } from '../Constants/actionTypes';

const project = (projects = [],action) => {
    switch (action.type) {
        case FETCH_PROJECTS: 
            return action.payload;
        case FETCH_PROJECT: 
            return action.payload;
        case ADD_PROJECT:
            return [...projects, action.payload];
        case DELETE_PROJECT: 
            return projects.filter((project) => project._id !== action.payload)
        case UPDATE_PROJECT:
            return projects.map((project) => (project._id === action.payload._id ? action.payload : project));
        default:
            return projects;
    }
}

export default project; 