import { combineReducers } from 'redux'

import auth from './auth'
import projects from './projects'

export const reducers = combineReducers({ auth, projects });