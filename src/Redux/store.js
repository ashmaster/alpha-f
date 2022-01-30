import {createStore} from 'redux'
const initialState = {
    queue: [],
    sugg: [],
    currSong: null,
    songClick: null,
}

function reducer(state = initialState, action){
    switch(action.type){
        case "UPDATESCLICK" : {
             const updatedClick = action.payload;
             return {...state, songClick: updatedClick}
        }
        case "SETSONG" : {
            return {...state, currSong: action.payload}
        }
        case "ADDTOQUEUE" : {
            const newItem = action.payload;
            const curQ = state.queue;
            curQ.push(newItem);
            return {...state, queue: curQ}
        }
        case "ADDTOSUGG" : {
            const newItem = action.payload;
            const curSug = state.sugg;
            curSug.push(newItem);
            return {...state, sugg: curSug}
        }
        default: return state
    }
}

export const store = createStore(reducer)