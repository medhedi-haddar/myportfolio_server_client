
import { FETCH_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, ADD_CONTACT } from '../Constants/actionTypes';

const contact = (contact = [],action) => {
    switch (action.type) {
        case FETCH_CONTACT: 
            return action.payload;
        case ADD_CONTACT:
            return action.payload;
        case DELETE_CONTACT: 
            return action.payload;
        case UPDATE_CONTACT:
            return action.payload;
        default:
            return contact;
    }
}

export default contact; 