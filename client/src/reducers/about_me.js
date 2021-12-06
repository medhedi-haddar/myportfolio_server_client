
import {FETCH_ABOUTME, UPDATE_ABOUTME, ADD_ABOUTME } from '../Constants/actionTypes';

const aboutMeReducer = (aboutMe = [],action) => {
    switch (action.type) {
        case FETCH_ABOUTME: 
            return action.payload;
        case ADD_ABOUTME:
            return [...aboutMe, action.payload];
        case UPDATE_ABOUTME:
            return aboutMe.map((about) => (about._id === action.payload._id ? action.payload : about));
        default:
            return aboutMe;
    }
}

export default aboutMeReducer; 