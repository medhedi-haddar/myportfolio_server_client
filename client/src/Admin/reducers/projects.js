import { FETCH_ONE,FETCH_ALL, DELETE, UPDATE, ADD } from '../Constants/actionTypes';


const projectsReducer = (projects = [],action) => {
    switch (action.type) {
        case FETCH_ALL: 
            return action.payload;
        case FETCH_ONE: 
            return action.payload;
        case ADD:
            return action.payload;
        case DELETE: 
            return projects.filter((project) => project._id !== action.payload)
        case UPDATE:
            // console.log(action.payload);
            return action.payload;
            return projects.map((project) => (project._id === action.payload._id ? action.payload : project));
        default:
            return projects;
    }
}

export default projectsReducer; 