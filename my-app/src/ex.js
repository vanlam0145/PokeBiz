import throttle from 'lodash.throttle'
var redux = require('redux');

// var defaulstate = {
//     id='',
//     username:'',
//     pass:'',
// }
// var reducer = (state = defaulstate, acction) => {
//     switch (acction.type) {
//         case 'CHAGE':
//             return {...state,test:[...state.test,acction.item]}
//         default:
//             return state;
//     }

// }
var reducerlogin=(state={xx:'a'},acction)=>{
    switch (acction.type) {
        case 'LOG':
            return acction.item    
        default:
            return state;
    }
}
const serializedState=JSON.parse(localStorage.getItem('state'));
var store = redux.createStore(reducerlogin,serializedState);
store.subscribe(throttle(()=>{
    const serializedState=JSON.stringify({log:store.getState()})
    localStorage.setItem('state',serializedState);
},1000))
export default store;