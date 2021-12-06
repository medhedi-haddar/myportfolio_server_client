
import { UPDATE_PROFILE } from '../Constants/actionTypes';

const profileReducer = (profile = [],action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return action.payload;
        default:
            return profile;
    }
}

export default profileReducer; 