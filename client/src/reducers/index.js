import { combineReducers } from 'redux'

import auth from './auth'
import profile from './profile'
import aboutMe from './about_me'
import skills from './skills'
import projects from './projects'
import experiences from './experiences'
import educations from './educations'
import contact from './contact'

export const reducers = combineReducers({ 
    auth ,
    profile ,
    aboutMe,
    skills,
    projects ,
    experiences,
    educations,
    contact
});
