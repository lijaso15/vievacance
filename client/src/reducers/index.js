import { combineReducers } from 'redux'
import position from './position'
import toggles from './toggles'
import err from './err'
import data from './data'
import perspective from './perspective'

//combine the reducers
export default combineReducers({
    position, toggles, err, data, perspective
})